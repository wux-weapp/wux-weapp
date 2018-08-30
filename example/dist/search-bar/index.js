Component({
	externalClasses: ['wux-class'],
    properties: {
        defaultValue: {
            type: String,
            value: '',
        },
        value: {
            type: String,
            value: '',
            observer(newVal) {
                if (!this.data.auto) {
                    this.updated(newVal)
                }
            },
        },
        placeholder: {
            type: String,
            value: '搜索',
        },
        maxlength: {
            type: Number,
            value: 140,
        },
        focus: {
            type: Boolean,
            value: false,
            observer(newVal) {
                this.setData({
                    inputFocus: newVal,
                })
            },
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        cancelText: {
            type: String,
            value: '取消',
        },
        showCancel: {
            type: Boolean,
            value: false,
        },
        auto: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        inputValue: '',
        inputFocus: false,
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({
                    inputValue,
                })
            }
        },
        onChange(e) {
            if (this.data.auto) {
                this.updated(e.detail.value)
            }

            if (!this.data.inputFocus) {
                this.setData({
                    inputFocus: true,
                })
            }

            this.triggerEvent('change', e.detail)
        },
        onFocus(e) {
            this.setData({
                inputFocus: true,
            })

            this.triggerEvent('focus', e.detail)
        },
        onBlur(e) {
            this.setData({
                inputFocus: false,
            })

            this.triggerEvent('blur', e.detail)
        },
        onConfirm(e) {
            this.triggerEvent('confirm', e.detail)
        },
        onClear() {
            const { auto, inputValue } = this.data

            this.setData({
                inputValue: !auto ? inputValue : '',
                inputFocus: true,
            })

            this.triggerEvent('clear', { value: '' })
        },
        onCancel() {
            this.triggerEvent('cancel', { value: this.data.inputValue })
        },
        onClick() {
            this.setData({
                inputFocus: true,
            })
        },
    },
    attached() {
        const { defaultValue, value, auto } = this.data
        const inputValue = !auto ? value : defaultValue

        this.updated(inputValue)
    },
})