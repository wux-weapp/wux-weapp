import baseBehavior from '../helpers/baseBehavior'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        max: {
            type: Number,
            value: 5,
        },
        star: {
            type: String,
            value: '★',
        },
        value: {
            type: Number,
            value: 0,
            observer(newVal, oldVal) {
                if (!this.data.disabled) {
                    this.updateValue(newVal)
                    this.triggerEvent('change', { value: newVal })
                }
            },
        },
        activeColor: {
            type: String,
            value: '#fc6',
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
    },
    methods: {
        updateStars() {
            const { max } = this.data
            const stars = [...new Array(max)].map((n, i) => i)

            this.setData({
                stars,
            })
        },
        updateValue(value = this.data.value) {
            const { max, activeColor } = this.data
            const newVal = value < 0 ? 0 : value > max ? max : value
            const colors = [...new Array(max)].reduce((a, b, i) => {
                const v = i <= value - 1 ? activeColor : '#ccc'
                a.push(v)
                return a
            }, [])
            const _val = newVal.toString().split('.')
            const sliceValue = _val.length === 1 ? [_val[0], 0] : _val

            this.setData({
                colors,
                value: newVal,
                cutIndex: sliceValue[0] * 1,
                cutPercent: sliceValue[1] * 10,
            })
        },
        handlerClick(e) {
            const { index } = e.currentTarget.dataset
            const { value, disabled } = this.data
            const newVal = value === index + 1 ? index : index + 1

            if (disabled) return false

            this.setData({
                value: newVal,
            })
        },
    },
    attached() {
        this.updateStars()
        this.updateValue()
    },
})