import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-search-bar',
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
        placeholder: {
            type: String,
            value: '搜索',
        },
        placeholderStyle: {
            type: String,
            value: '',
        },
        placeholderClass: {
            type: String,
            value: 'input-placeholder',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        maxlength: {
            type: Number,
            value: 140,
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
        confirmType: {
            type: String,
            value: 'search',
        },
        confirmHold: {
            type: Boolean,
            value: false,
        },
        cursor: {
            type: Number,
            value: -1,
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
        clear: {
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
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        inputValue: '',
        inputFocus: false,
    },
    computed: {
        classes() {
            const { prefixCls, disabled, inputFocus } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
            })
            const form = `${prefixCls}__form`
            const box = `${prefixCls}__box`
            const search = `${prefixCls}__search`
            const input = `${prefixCls}__input`
            const clear = `${prefixCls}__clear`
            const label = `${prefixCls}__label`
            const icon = `${prefixCls}__icon`
            const text = `${prefixCls}__text`
            const cancel = `${prefixCls}__cancel`

            return {
                wrap,
                form,
                box,
                search,
                input,
                clear,
                label,
                icon,
                text,
                cancel,
            }
        },
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
        onCancel() {
            this.triggerEvent('cancel', { value: this.data.inputValue })
        },
        onClick() {
            if (this.data.disabled) return

            this.setData({
                inputFocus: true,
            })
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const inputValue = controlled ? value : defaultValue

        this.updated(inputValue)
    },
})