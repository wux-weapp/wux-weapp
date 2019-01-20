import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-rater',
        },
        max: {
            type: Number,
            value: 5,
            observer() {
                this.updateValue()
            },
        },
        icon: {
            type: String,
            value: '',
        },
        star: {
            type: String,
            value: '★',
        },
        defaultValue: {
            type: Number,
            value: 0,
        },
        value: {
            type: Number,
            value: 0,
            observer(newVal) {
                if (this.data.controlled) {
                    this.updateValue(newVal)
                }
            },
        },
        activeColor: {
            type: String,
            value: '#ffc900',
        },
        margin: {
            type: Number,
            value: 2,
        },
        fontSize: {
            type: Number,
            value: 25,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        allowHalf: {
            type: Boolean,
            value: false,
        },
        allowClear: {
            type: Boolean,
            value: false,
        },
        allowTouchMove: {
            type: Boolean,
            value: false,
        },
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        raterValue: 0,
    },
    computed: {
        classes() {
            const { prefixCls, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--disabled`]: disabled,
            })
            const star = `${prefixCls}__star`
            const box = `${prefixCls}__box`
            const inner = `${prefixCls}__inner`
            const outer = `${prefixCls}__outer`
            const icon = `${prefixCls}__icon`

            return {
                wrap,
                star,
                box,
                inner,
                outer,
                icon,
            }
        },
    },
    methods: {
        updateValue(value = this.data.raterValue) {
            const { max, activeColor } = this.data
            const stars = [...new Array(max)].map((_, i) => i)
            const raterValue = value <= 0 ? 0 : value > max ? max : value
            const colors = stars.reduce((a, _, i) => ([...a, i <= value - 1 ? activeColor : '#ccc']), [])
            const _val = raterValue.toString().split('.')
            const sliceValue = _val.length === 1 ? [_val[0], 0] : _val

            this.setData({
                stars,
                colors,
                raterValue,
                cutIndex: sliceValue[0] * 1,
                cutPercent: sliceValue[1] * 10,
            })
        },
        updateHalfStarValue(index, x, cb) {
            const { prefixCls } = this.data
            const query = wx.createSelectorQuery().in(this)
            query.selectAll(`.${prefixCls}__star`).boundingClientRect((rects) => {
                if (rects.filter((n) => !n).length) return
                const { left, width } = rects[index]
                const has = (x - left) < width / 2
                const value = has ? index + .5 : index + 1
                cb.call(this, value, index)
            }).exec()
        },
        onTap(e) {
            const { index } = e.currentTarget.dataset
            const { raterValue, disabled, allowHalf, allowClear } = this.data

            // 判断是否禁用
            if (!disabled) {
                // 判断是否支持选中半星
                if (!allowHalf) {
                    const value = index + 1
                    const isReset = allowClear && value === raterValue

                    this.fireEvents(isReset ? 0 : value, index)
                } else {
                    this.updateHalfStarValue(index, e.detail.x, (value, index) => {
                        const isReset = allowClear && value === raterValue

                        this.fireEvents(isReset ? 0 : value, index)
                    })
                }
            }
        },
        fireEvents(value, index) {
            if (!this.data.controlled) {
                this.updateValue(value)
            }

            this.triggerEvent('change', { value, index })
        },
        onTouchMove(e) {
            const { disabled, allowHalf, allowTouchMove } = this.data
            if (!disabled && allowTouchMove) {
                const x = e.changedTouches[0].pageX
                const { prefixCls } = this.data
                const query = wx.createSelectorQuery().in(this)
                query.selectAll(`.${prefixCls}__star`).boundingClientRect((rects) => {
                    if (rects.filter((n) => !n).length) return
                    const { left, width } = rects[0]
                    const maxWidth = rects.map((n) => n.width).reduce((a, b) => a + b)
                    const diff = x - left
                    let value = Math.ceil(diff / width)

                    // 判断是否在组件宽度范围内
                    if (diff > 0 && diff < maxWidth) {
                        const index = value - 1
                        if (allowHalf) {
                            const star = rects[index]
                            const has = (x - star.left) < star.width / 2
                            value = has ? value - .5 : value
                        }
                        this.fireEvents(value, index)
                    }
                }).exec()
            }
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const raterValue = controlled ? value : defaultValue

        this.updateValue(raterValue)
    },
})
