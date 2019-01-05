import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-textarea',
        },
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
    computed: {
        classes() {
            const { prefixCls, disabled, inputFocus, error: hasError, hasCount } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--error`]: hasError,
                [`${prefixCls}--has-count`]: hasCount,
            })
            const label = `${prefixCls}__label`
            const control = `${prefixCls}__control`
            const item = `${prefixCls}__item`
            const clear = `${prefixCls}__clear`
            const error = `${prefixCls}__error`
            const extra = `${prefixCls}__extra`
            const count = `${prefixCls}__count`
            const current = `${prefixCls}__current`

            return {
                wrap,
                label,
                control,
                item,
                clear,
                error,
                extra,
                count,
                current,
            }
        },
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

            this.triggerEvent('change', e.detail)
        },
        onFocus(e) {
            this.clearTimer()

            this.setData({
                inputFocus: true,
            })

            this.triggerEvent('focus', e.detail)
        },
        onBlur(e) {
            this.setTimer()

            this.triggerEvent('blur', e.detail)
        },
        onConfirm(e) {
            this.triggerEvent('confirm', e.detail)
        },
        onClear() {
            const { controlled, inputValue } = this.data

            this.setData({
                inputValue: controlled ? inputValue : '',
            })

            this.triggerEvent('clear', { value: '' })
        },
        onError() {
            this.triggerEvent('error', { value: this.data.inputValue })
        },
        onLineChange(e) {
            this.triggerEvent('linechange', e.detail)
        },
        setTimer() {
            this.clearTimer()

            this.timeout = setTimeout(() => {
                this.setData({
                    inputFocus: false,
                })
            }, 200)
        },
        clearTimer() {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
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