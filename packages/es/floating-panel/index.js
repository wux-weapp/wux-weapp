import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { nearest } from '../helpers/shared/nearest'
import { getTouchPoints, getPointsNumber } from '../helpers/shared/gestures'
import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { rubberbandIfOutOfBounds } from '../helpers/shared/rubberband'

baseComponent({
    useExport: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-floating-panel',
        },
        defaultAnchors: {
            type: Array,
            value: [],
        },
    },
    data: {
        wrapStyle: '',
        possibles: [],
        moving: false,
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`
            const bar = `${prefixCls}__bar`
            const mask = `${prefixCls}__mask`

            return {
                wrap,
                hd,
                bd,
                bar,
                mask,
            }
        }],
    },
    methods: {
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {
            if (this.data.moving || getPointsNumber(e) > 1) return
            this.startY = getTouchPoints(e).y
            this.moveY = 0
            this.endY = 0
            this.setData({ moving: true })
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            if (!this.data.moving || getPointsNumber(e) > 1) return
            this.moveY = getTouchPoints(e).y
            const deltaY = this.moveY - this.startY
            const offsetY = rubberbandIfOutOfBounds(
                Math.abs(this.lastY + deltaY),
                -this.bounds.bottom,
                -this.bounds.top,
            )
            this.setTransform(-Math.round(offsetY))
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (!this.data.moving || getPointsNumber(e) > 1) return
            this.endY = getTouchPoints(e).y
            const deltaY = this.endY - this.startY
            const offsetY = this.lastY + deltaY
            this.lastY = nearest(this.data.possibles, offsetY)
            this.setTransform(Math.round(this.lastY), .3)
            setTimeout(() => this.setData({ moving: false }), 300)
        },
        /**
         * 设置滚动样式
         */
        setTransform(y, time) {
            const wrapStyle = styleToCssString({
                height: `${-this.bounds.top}px`,
                transform: `translate3d(0, calc(100% + ${y}px), 0)`,
                transition: time ? `cubic-bezier(0, 0, 0.2, 1.15) ${time}s` : 'none',
            })
            if (this.data.wrapStyle !== wrapStyle) {
                this.setData({ wrapStyle }, () => {
                    if (!!time) {
                        setTimeout(() => this.setTransform(y), time * 1000)
                    }
                })
                this.triggerEvent('heightChange', {
                    height: -y,
                    minHeight: -this.bounds.bottom,
                    maxHeight: -this.bounds.top,
                    animating: !!time,
                })
            }
        },
        ['export']() {
            const setHeight = (height, options = { immediate: false }) => {
                this.setTransform(-height, options.immediate ? .3 : 0)
                this.lastY = -height
            }

            return {
                setHeight,
            }
        },
    },
    created() {
        this.moveY = 0
        this.endY = 0
        this.startY = 0
        this.lastY = 0
    },
    attached() {
        const defaultAnchors = this.data.defaultAnchors.filter(x => typeof x === 'number').filter(x => x > 0)
        const possibles = defaultAnchors.length === 0 ? [-getSystemInfoSync(['window']).windowHeight] : defaultAnchors.map(x => -x)
        const bounds = {
            top: Math.round(possibles[possibles.length - 1]),
            bottom: Math.round(possibles[0]),
        }
        this.bounds = bounds
        this.lastY = bounds.bottom
        this.setData({
            possibles,
        })
        this.setTransform(bounds.bottom)
    },
})
