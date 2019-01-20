import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'
import { getTouchPoints, getPointsNumber } from '../helpers/gestures'

/**
 * 获取小数位数
 */
const getPrecision = (step) => {
    const stepString = step.toString()
    return stepString.indexOf('.') >= 0 ? stepString.length - stepString.indexOf('.') - 1 : 0
}

/**
 * 返回精度正确的值
 */
const checkValuePrecision = (val, step, min) => {
    const closestStep = Math.round((val - min) / step) * step + min
    const precision = getPrecision(step)
    return parseFloat(closestStep.toFixed(precision))
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-slider',
        },
        min: {
            type: Number,
            value: 0,
            observer: 'getMarks',
        },
        max: {
            type: Number,
            value: 100,
            observer: 'getMarks',
        },
        step: {
            type: Number,
            value: 1,
            observer: 'getMarks',
        },
        defaultValue: {
            type: Array,
            value: [0],
        },
        value: {
            type: Array,
            value: [0],
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        showMark: {
            type: Boolean,
            value: false,
        },
        showValue: {
            type: [Boolean, Object],
            value: false,
        },
        markStyle: {
            type: [String, Object, Array],
            value: '',
            observer(newVal) {
                this.setData({
                    extMarkStyle: Array.isArray(newVal) ? newVal.map((n) => styleToCssString(n)) : styleToCssString(newVal),
                })
            },
        },
        handleStyle: {
            type: [String, Object, Array],
            value: '',
            observer(newVal) {
                this.setData({
                    extHandleStyle: Array.isArray(newVal) ? newVal.map((n) => styleToCssString(n)) : styleToCssString(newVal),
                })
            },
        },
        trackStyle: {
            type: [String, Object, Array],
            value: '',
            observer(newVal) {
                this.setData({
                    extTrackStyle: Array.isArray(newVal) ? newVal.map((n) => styleToCssString(n)) : styleToCssString(newVal),
                })
            },
        },
        railStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extRailStyle: styleToCssString(newVal),
                })
            },
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extWrapStyle: styleToCssString(newVal),
                })
            },
        },
    },
    data: {
        offsets: [],
        sliderValue: [],
        extMarkStyle: '',
        extHandleStyle: '',
        extTrackStyle: '',
        extRailStyle: '',
        extWrapStyle: '',
    },
    computed: {
        classes() {
            const { prefixCls, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--disabled`]: disabled,
            })
            const min = `${prefixCls}__min`
            const rail = `${prefixCls}__rail`
            const mark = `${prefixCls}__mark`
            const track = `${prefixCls}__track`
            const handle = `${prefixCls}__handle`
            const max = `${prefixCls}__max`

            return {
                wrap,
                min,
                rail,
                mark,
                track,
                handle,
                max,
            }
        },
    },
    methods: {
        /**
         * 更新选中值及偏移量
         */
        updated(sliderValue) {
            const offsets = sliderValue.map((value) => this.calcOffset(this.checkValue(value)))
            this.setData({ offsets, sliderValue })
        },
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {
            if (this.data.disabled || getPointsNumber(e) > 1) return
            const { index } = e.currentTarget.dataset
            this.isMoved = false
            this.startX = getTouchPoints(e).x
            this.moveX = 0
            // 记录选中值发生改变时的初始偏移量
            this.startPos = this.data.offsets[index] || 0
            // 记录最后一次选中项
            this.setData({ last: index })
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            if (this.data.disabled || getPointsNumber(e) > 1) return
            const { index } = e.currentTarget.dataset
            const { prefixCls } = this.data

            this.isMoved = true
            this.moveX = getTouchPoints(e).x

            this.getRect(`.${prefixCls}__rail`).then((rect) => {
                if (!rect || !this.isMoved) return

                const diffX = (this.moveX - this.startX) / rect.width * (this.data.max - this.data.min)
                const nextOffsets = [...this.data.offsets]
                const offset = this.checkValue(this.startPos + diffX, 0, 100)
                const { sliderValue } = this.data
                const currentValue = this.calcValue(offset)
                const prevValue = sliderValue[index - 1]
                const nextValue = sliderValue[index + 1]

                // 通过合法的当前值反算偏移量
                nextOffsets[index] = this.calcOffset(currentValue)

                // 判断当前值是否小于前一值，是则重新计算偏移量
                if (prevValue && prevValue > currentValue) {
                    nextOffsets[index] = this.calcOffset(prevValue)
                }

                // 判断当前值是否大于后一值，是则重新计算偏移量
                if (nextValue && nextValue < currentValue) {
                    nextOffsets[index] = this.calcOffset(nextValue)
                }

                // 判断当前值是否发生变化，是则触发 change 事件
                if (sliderValue[index] !== currentValue) {
                    const value = this.getValue(nextOffsets)

                    if (!this.data.controlled) {
                        this.setData({ offsets: nextOffsets, sliderValue: value })
                    }

                    this.triggerEvent('change', { offsets: nextOffsets, value })
                }
            })
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (this.data.disabled || getPointsNumber(e) > 1) return
            this.isMoved = false
            const { offsets } = this.data
            const value = this.getValue(offsets)
            this.triggerEvent('afterChange', { offsets, value })
        },
        /**
         * 获取界面上的节点信息
         */
        getRect(selector, all) {
            return new Promise((resolve) => {
                wx
                    .createSelectorQuery()
                    .in(this)[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect((rect) => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect)
                        }

                        if (!all && rect) {
                            resolve(rect)
                        }
                    })
                    .exec()
            })
        },
        /**
         * 计算选中值
         */
        calcValue(ratio) {
            const { min, max } = this.data
            return this.trimValue(ratio * (max - min) / 100 + min)
        },
        /**
         * 计算偏移量
         */
        calcOffset(value) {
            const { min, max } = this.data
            const ratio = (value - min) / (max - min)
            return ratio * 100
        },
        /**
         * 判断元素是否在指定的范围内
         */
        checkValue(val, min = this.data.min, max = this.data.max) {
            if (val <= min) {
                return min
            }

            if (val >= max) {
                return max
            }

            return val
        },
        /**
         * 验证选中值
         */
        trimValue(val) {
            return checkValuePrecision(this.checkValue(val), this.data.step, this.data.min)
        },
        /**
         * 获取选中值
         */
        getValue(offsets = this.data.offsets) {
            return offsets.map((offset) => this.calcValue(offset))
        },
        /**
         * 获取间断点位置
         */
        getMarks() {
            if (!this.data.showMark) return

            const {min, max, step } = this.data
            const count = (max - min) / step
            const marks = []
            const offset = 100 * step / (max - min)

            for (let i = 1; i < count; i++) {
                marks.push(i * offset)
            }

            this.setData({ marks })
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const sliderValue = controlled ? value : defaultValue

        this.updated(sliderValue)
        this.getMarks()
    },
})
