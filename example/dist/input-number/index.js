import baseBehavior from '../helpers/baseBehavior'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class', 'wux-input-class'],
    properties: {
        min: {
            type: Number,
            value: -999999,
        },
        max: {
            type: Number,
            value: 999999,
        },
        step: {
            type: Number,
            value: 1,
        },
        value: {
            type: Number,
            value: 0,
            observer(newVal) {
                this.updateValues(newVal)
                this.triggerEvent('change', { value: newVal })
            },
        },
        disabled: {
            type: Boolean,
            value: true,
        },
        longpress: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        /**
         * 更新值
         */
        updateValues(value) {
            const { min, max } = this.data

            // 最小值
            if (min && value < min) {
                value = min
            }

            // 最大值
            if (max && value > max) {
                value = max
            }

            const disabledMin = value <= min
            const disabledMax = value >= max

            // 更新数值，判断最小或最大值禁用 sub 或 add 按钮
            this.setData({
                value,
                disabledMin,
                disabledMax,
            })
        },
        /**
         * 数字计算函数
         */
        calculation(type, meta) {
            const { disabledMax, disabledMin, value, step, longpress } = this.data

            if (type === 'add') {
                if (disabledMax) return false
                this.setData({
                    value: value + step,
                })
            }

            if (type === 'sub') {
                if (disabledMin) return false
                this.setData({
                    value: value - step,
                })
            }

            if (longpress && meta) {
                this.timeout = setTimeout(() => this.calculation(type, meta), 100)
            }
        },
        /**
         * 当键盘输入时，触发 input 事件
         */
        bindinput(e) {
            const value = Number(e.detail.value) || 0
            if (this.inputTime) {
                clearTimeout(this.inputTime)
                this.inputTime = null
            }
            this.inputTime = setTimeout(() => {
                this.setData({
                    value,
                })
            }, 300)
        },
        /**
         * 手指触摸后，超过350ms再离开
         */
        bindlongpress(e) {
            const { type } = e.currentTarget.dataset
            const { longpress } = this.data
            if (longpress) {
                this.calculation(type, true)
            }
        },
        /**
         * 手指触摸后马上离开
         */
        bindtap(e) {
            const { type } = e.currentTarget.dataset
            const { longpress } = this.data
            if (!longpress || longpress && !this.timeout) {
                this.calculation(type, false)
            }
        },
        /**
         * 	手指触摸动作结束
         */
        bindtouchend(e) {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
        },
        /**
         * 手指触摸动作被打断，如来电提醒，弹窗
         */
        touchcancel(e) {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
        },
    },
})