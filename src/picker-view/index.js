import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import shallowEqual from '../helpers/shallowEqual'
import styleToCssString from '../helpers/styleToCssString'
import { getTouchPoints, getPointsNumber } from '../helpers/gestures'
import { getSystemInfo } from '../helpers/checkIPhoneX'
import { defaultFieldNames, props } from './props'
import {
    getRealCol,
    getRealValue,
    getIndexFromValue,
    getLabelFromIndex,
} from './utils'

function getStyles(value) {
    return Array.isArray(value) ? value.map((n) => styleToCssString(n)) : styleToCssString(value)
}

baseComponent({
    properties: props,
    data: {
        inputValue: null,
        selectedIndex: null,
        selectedValue: null,
        cols: [],
        extIndicatorStyle: '',
        extItemStyle: '',
        extMaskStyle: '',
        contentStyle: '',
        fieldNames: defaultFieldNames,
        itemCount: 7, // 默认显示的子元素个数
        styles: {},
    },
    computed: {
        classes: ['prefixCls, labelAlign', function(prefixCls, labelAlign) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${labelAlign}`]: labelAlign,
            })
            const mask = `${prefixCls}__mask`
            const indicator = `${prefixCls}__indicator`
            const content = `${prefixCls}__content`
            const item = `${prefixCls}__item`

            return {
                wrap,
                mask,
                indicator,
                content,
                item,
            }
        }],
    },
    observers: {
        itemHeight(newVal) {
            this.updatedStyles(newVal)
        },
        itemStyle(newVal) {
            this.setData({
                extItemStyle: getStyles(newVal),
            })
        },
        indicatorStyle(newVal) {
            this.setData({
                extIndicatorStyle: getStyles(newVal),
            })
        },
        maskStyle(newVal) {
            this.setData({
                extMaskStyle: getStyles(newVal),
            })
        },
        ['value, options'](value, options) {
            const { controlled } = this.data
            const fieldNames = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)
            const cols = getRealCol(options, fieldNames)

            if (!shallowEqual(this.data.cols, cols)) {
                this.setData({ cols })
            }

            if (controlled) {
                this.setValue(value, true)
            }
        },
        inputValue(newVal) {
            const {
                selectedIndex,
                selectedValue,
            } = this.getValue(newVal)

            this.setData({
                selectedIndex,
                selectedValue,
            })
        },
    },
    methods: {
        updatedStyles(itemHeight) {
            let num = this.data.itemCount
            if (num % 2 === 0) {
                num--
            }
            num--
            num /= 2

            const wrap = `height: ${itemHeight * this.data.itemCount}px;`
            const item = `line-height: ${itemHeight}px; height: ${itemHeight}px;`
            const content = `padding: ${itemHeight * num}px 0;`
            const indicator = `top: ${itemHeight * num}px; height: ${itemHeight}px;`
            const mask = `background-size: 100% ${itemHeight * num}px;`
            const styles = {
                wrap,
                item,
                content,
                indicator,
                mask,
            }

            this.setData({ styles })
        },
        updated(inputValue, isForce) {
            if (this.data.inputValue !== inputValue || isForce) {
                this.setData({
                    inputValue,
                })
            }

            // 设置选择器位置
            if (isForce) {
                this.select(inputValue, this.data.itemHeight, (y) => this.scrollTo(y, 0, false))
            }
        },
        setValue(value, isForce) {
            const { value: inputValue } = this.getValue(value)
            this.updated(inputValue, isForce)
        },
        getValue(value = this.data.inputValue, cols = this.data.cols) {
            const { fieldNames } = this.data
            const inputValue = getRealValue(value, cols, fieldNames) || null
            const selectedValue = inputValue
            const selectedIndex = getIndexFromValue(value, cols, fieldNames)
            const displayValue = getLabelFromIndex(selectedIndex, cols, fieldNames.label)

            return {
                value: inputValue,
                displayValue,
                selectedIndex,
                selectedValue,
                cols,
            }
        },
        /**
         * 设置选择器的位置信息
         */
        scrollTo(y, time = .3, runCallbacks = true) {
            if (this.scrollY !== y) {
                if (this.runCallbacks) {
                    clearTimeout(this.runCallbacks)
                    this.runCallbacks = null
                }
                this.scrollY = y
                this.setTransform(-y, time, () => {
                    runCallbacks && (this.runCallbacks = setTimeout(() => {
                        this.setTransform(-y, 0, this.scrollingComplete)
                    }, +time * 1000))
                })
            }
        },
        /**
         * 滚动结束时的回调函数
         */
        onFinish() {
            this.isMoving = false
            let targetY = this.scrollY
            const { cols, itemHeight } = this.data
            const height = (cols.length - 1) * itemHeight

            let time = .3

            // const velocity = this.Velocity.getVelocity(targetY) * 4
            // if (velocity) {
            //     targetY = velocity * 40 + targetY
            //     time = Math.abs(velocity) * .1
            //     time = parseFloat(time.toFixed(2))
            // }

            if (targetY % itemHeight !== 0) {
                targetY = Math.round(targetY / itemHeight) * itemHeight
            }

            if (targetY < 0) {
                targetY = 0
            } else if (targetY > height) {
                targetY = height
            }

            // check disabled & reset
            const child = this.getChildMeta(targetY, itemHeight)
            if (child && !child.disabled) {
                this.scrollTo(targetY, time < .3 ? .3 : time)
            } else {
                this.select(this.data.inputValue, itemHeight, (y) => this.scrollTo(y, 0, false))
            }

            this.onScrollChange()
        },
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {
            if (getPointsNumber(e) > 1) return
            this.isMoving = true
            this.startY = getTouchPoints(e).y
            this.lastY = this.scrollY
            this.triggerEvent('beforeChange', this.getValue())
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            if (!this.isMoving || getPointsNumber(e) > 1) return
            this.scrollY = this.lastY - getTouchPoints(e).y + this.startY
            this.setTransform(-this.scrollY, false, this.onScrollChange)
            // this.Velocity.record(this.scrollY)
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (getPointsNumber(e) > 1) return
            this.onFinish()
        },
        /**
         * 手指触摸后马上离开
         */
        onItemClick(e) {
            const { index, disabled } = e.currentTarget.dataset
            if (!disabled) {
                this.scrollTo(index * this.data.itemHeight)
            }
        },
        /**
         * 设置滚动样式
         */
        setTransform(y, time, cb) {
            const contentStyle = {
                transform: `translate3d(0,${y}px,0)`,
                transition: time ? `cubic-bezier(0, 0, 0.2, 1.15) ${time}s` : 'none',
            }
            this.setData({ contentStyle: styleToCssString(contentStyle) }, cb)
        },
        /**
         * 设置选择器
         */
        select(value, itemHeight, scrollTo) {
            const { cols: children, fieldNames } = this.data
            const index = getIndexFromValue(value, children, fieldNames)
            this.selectByIndex(index, itemHeight, scrollTo)
        },
        /**
         * 通过元素的索引值设置选择器
         */
        selectByIndex(index, itemHeight, zscrollTo) {
            if (index < 0 || index >= this.data.cols.length || !itemHeight) return
            zscrollTo.call(this, index * itemHeight)
        },
        /**
         * 计算子元素的索引值
         */
        computeChildIndex(top, itemHeight, childrenLength) {
            const index = Math.round(top / itemHeight)
            return Math.min(index, childrenLength - 1)
        },
        /**
         * 获取子元素的属性
         */
        getChildMeta(top, itemHeight) {
            const { cols: children, fieldNames } = this.data
            const index = this.computeChildIndex(top, itemHeight, children.length)
            const child = children[index]
            return child
        },
        /**
         * 滚动完成的回调函数
         */
        scrollingComplete() {
            const top = this.scrollY
            if (top >= 0) {
                const { itemHeight, fieldNames } = this.data
                const child = this.getChildMeta(top, itemHeight)
                if (child) {
                    const inputValue = child[fieldNames.value]
                    if (this.data.inputValue !== inputValue) {
                        this.fireValueChange(inputValue)
                    }
                }
            }
        },
        /**
         * 滚动数据选择变化后的回调函数
         */
        onScrollChange() {
            const top = this.scrollY
            if (top >= 0) {
                const { cols: children, itemHeight, fieldNames } = this.data
                const index = this.computeChildIndex(top, itemHeight, children.length)
                if (this.scrollValue !== index) {
                    this.scrollValue = index
                    const child = children[index]
                    if (child) {
                        const values = this.getValue(child[fieldNames.value])
                        this.triggerEvent('scrollChange', values)
                    }

                    // 振动反馈
                    this.vibrateShort()
                }
            }
        },
        /**
         * 数据选择变化后的回调函数
         */
        fireValueChange(value) {
            if (!this.data.controlled) {
                this.updated(value)
            }
            this.triggerEvent('valueChange', this.getValue(value))

            // 振动反馈
            this.vibrateShort()
        },
    },
    created() {
        const systemInfo = getSystemInfo()
        this.vibrateShort = () => {
            if (systemInfo.platform !== 'devtools') {
                wx.vibrateShort()
            }
        }

        this.scrollValue = undefined
        this.scrollY = -1
        this.lastY = 0
        this.startY = 0
        this.isMoving = false

        // this.Velocity = ((minInterval = 30, maxInterval = 100) => {
        //     let _time = 0
        //     let _y = 0
        //     let _velocity = 0
        //     const recorder = {
        //         record: (y) => {
        //             const now = +new Date()
        //             _velocity = (y - _y) / (now - _time)
        //             if (now - _time >= minInterval) {
        //                 _velocity = now - _time <= maxInterval ? _velocity : 0
        //                 _y = y
        //                 _time = now
        //             }
        //         },
        //         getVelocity: (y) => {
        //             if (y !== _y) {
        //                 recorder.record(y)
        //             }
        //             return _velocity
        //         },
        //     }
        //     return recorder
        // })()
    },
    attached() {
        const { defaultValue, value, controlled, options, itemHeight } = this.data
        const inputValue = controlled ? value : defaultValue
        const fieldNames = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)
        const cols = getRealCol(options, fieldNames)
        
        this.updatedStyles(itemHeight)
        this.setData({ cols, fieldNames })
        this.setValue(inputValue, true)
    },
})
