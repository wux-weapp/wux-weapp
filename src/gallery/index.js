import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { getTouchPoints, getPointsNumber, getPointsDistance } from '../helpers/gestures'

const defaults = {
    prefixCls: 'wux-gallery',
    classNames: 'wux-animate--slideInRight',
    indicatorDots: false,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#000000',
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular: false,
    vertical: false,
    showDelete: true,
    allowScale: true,
    current: 0,
    urls: [],
    ['delete']() {},
    cancel() {},
    onChange() {},
    onTap() { return true },
}

const MIN_RATIO = 1
const MAX_RATIO = 1.2

const defaultTouchOptions = {
    scale: 1,
    offset: [.5, 3],
}

const getImages = (urls = []) => {
    return urls.map((n) => {
        if (typeof n !== 'object') {
            return {
                image: n,
                remark: '',
                touch: { ...defaultTouchOptions },
            }
        }

        return { ...n, touch: { ...defaultTouchOptions } }
    })
}

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes() {
            const { prefixCls } = this.data
            const swiper = `${prefixCls}__swiper`
            const item = `${prefixCls}__item`
            const img = `${prefixCls}__img`
            const remark = `${prefixCls}__remark`
            const opr = `${prefixCls}__opr`
            const del = `${prefixCls}__del`
            const icon = `${prefixCls}__icon`

            return {
                swiper,
                item,
                img,
                remark,
                opr,
                del,
                icon,
            }
        },
    },
    methods: {
        /**
         * 隐藏
         */
        hide() {
            this.$$setData({ in: false })
            if (typeof this.fns.cancel === 'function') {
                this.fns.cancel()
            }
        },
        /**
         * 显示
         */
        show(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts, {
                images: getImages(opts.urls),
            }))

            this.$$setData({ in: true, ...options })
        },
        /**
         * 图片点击事件
         */
        onTap(e) {
            if (this.allowItemClick) {
                const { index } = e.currentTarget.dataset
                if (this.fns.onTap(index, this.data.urls) === true) {
                    this.hide()
                }
            }
        },
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {
            this.allowItemClick = true

            if (!this.data.allowScale || getPointsNumber(e) === 1 || this.touching) {
                return false
            }

            const p1 = getTouchPoints(e)
            const p2 = getTouchPoints(e, 1)
            const distance = getPointsDistance(p1, p2)

            this.touching = false
            this.prevDistance = distance

            this.$$setData({
                transition: 'none',
            })
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            if (!this.data.allowScale || getPointsNumber(e) === 1 || this.isRendered) {
                return false
            }

            const p1 = getTouchPoints(e)
            const p2 = getTouchPoints(e, 1)
            const distance = getPointsDistance(p1, p2)
            const { touch, index } = e.currentTarget.dataset
            const distanceDiff = distance - this.prevDistance
            let scale = touch.scale + 0.005 * distanceDiff

            if (index !== this.data.current) {
                return false
            }

            if (scale <= touch.offset[0] * MIN_RATIO) {
                scale = touch.offset[0] * MIN_RATIO
            } else if (scale >= touch.offset[1] * MAX_RATIO) {
                scale = touch.offset[1] * MAX_RATIO
            }

            const params = {
                [`images[${index}].touch.scale`]: scale,
            }

            if (!this.touching) {
                this.touching = true
            }

            this.prevDistance = distance
            this.allowItemClick = false
            this.isRendered = true

            this.$$setData(params).then(() => (this.isRendered = false))
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (!this.data.allowScale || !this.touching) {
                return false
            }

            const { touch, index } = e.currentTarget.dataset

            let scale = touch.scale

            if (scale <= 1) {
                scale = 1
            } else if (scale >= touch.offset[1] * MAX_RATIO) {
                scale = touch.offset[1]
            }

            const params = {
                [`images[${index}].touch.scale`]: scale,
                transition: 'transform .3s',
            }

            this.touching = false

            this.$$setData(params).then(() => {
                // Allow click
                setTimeout(() => (this.allowItemClick = true), 400)
            })
        },
        /**
         * 点击删除按钮时会触发 delete 事件
         */
        onDelete(e) {
            if (typeof this.fns['delete'] === 'function') {
                if (this.fns['delete'](this.data.current, this.data.urls) === true) {
                    this.hide()
                }
            }
        },
        /**
         * current 改变时会触发 change 事件
         */
        onChange(e) {
            this.$$setData({ current: e.detail.current })
            if (typeof this.fns.onChange === 'function') {
                this.fns.onChange.call(this, e)
            }
        },
        /**
         * 滚动到指定图片
         * @param {Number} current 滑块的索引值
         * @param {Number} duration 延迟时长触发事件
         */
        slideTo(current = 0, duration = 0) {
            const { urls, circular } = this.data
            const max = urls.length - 1

            if (current < 0) {
                current = circular ? max : 0
            } else if (current > max) {
                current = circular ? 0 : max
            }

            if (duration > 0) {
                return this.$$requestAnimationFrame(() => this.$$setData({ current }), duration)
            }

            return this.$$setData({ current })
        },
        /**
         * 滚动到下一张图片
         * @param {Number} duration 延迟时长触发事件
         */
        slideNext(duration) {
            return this.slideTo(this.data.current + 1, duration)
        },
        /**
         * 滚动到上一张图片
         * @param {Number} duration 延迟时长触发事件
         */
        slidePrev(duration) {
            return this.slideTo(this.data.current - 1, duration)
        },
    },
})
