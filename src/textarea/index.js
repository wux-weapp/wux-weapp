Component({
	externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
        label: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        defaultValue: {
            type: String,
            value: '',
        },
        value: {
            type: String,
            value: '',
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
        placeholder: {
            type: String,
            value: '',
        },
        placeholderStyle: {
            type: String,
            value: '',
        },
        placeholderClass: {
            type: String,
            value: 'textarea-placeholder',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        maxlength: {
            type: Number,
            value: 140,
        },
        autoHeight: {
            type: Boolean,
            value: false,
        },
        cursorSpacing: {
            type: Number,
            value: 11,
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
        cursor: {
            type: Number,
            value: -1,
        },
        showConfirmBar: {
            type: Boolean,
            value: true,
        },
        selectionStart: {
            type: Number,
            value: -1,
        },
        selectionEnd: {
            type: Number,
            value: -1,
        },
        adjustPosition: {
            type: Boolean,
            value: true,
        },
        rows: {
            type: Number,
            value: 1,
            observer: 'updateHeight',
        },
        hasCount: {
            type: Boolean,
            value: false,
        },
        clear: {
            type: Boolean,
            value: false,
        },
        error: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        inputValue: '',
        inputFocus: false,
        inputRows: 1,
        inputHeight: '',
    },
    methods: {
        updateHeight(val = this.data.rows) {
            // rows 取值为大于或等于 1 的正整数
            const rows = Math.max(1, parseInt(val))
            const { inputRows } = this.data

            if (inputRows !== rows) {
                wx
                    .createSelectorQuery()
                    .in(this).select('.wux-textarea__item')
                    .boundingClientRect((rect) => {
                        if (rect) {
                            const lineHeight = inputRows > 1 ? rect.height / inputRows : rect.height
                            const inputHeight = lineHeight * rows

                            this.setData({
                                inputRows: rows,
                                inputHeight,
                            })
                        }
                    })
                    .exec()
            }
        },
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({
                    inputValue,
                })
            }
        },
        onChange(e) {
            if (!this.data.controlled) {
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
            const { controlled, inputValue } = this.data

            this.setData({
                inputValue: controlled ? inputValue : '',
                inputFocus: true,
            })

            this.triggerEvent('clear', { value: '' })
        },
        onError() {
            this.triggerEvent('error', { value: this.data.inputValue })
        },
        onLineChange(e) {
            this.triggerEvent('linechange', e.detail)
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const inputValue = controlled ? value : defaultValue

        this.updated(inputValue)
    },
    ready() {
        this.updateHeight()
    },
})