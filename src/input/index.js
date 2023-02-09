import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import eventsMixin from '../helpers/eventsMixin'
import styleToCssString from '../helpers/styleToCssString'

const defaultEvents = {
    onChange() {},
    onFocus() {},
    onBlur() {},
    onConfirm() {},
    onClear() {},
    onError() {},
}

baseComponent({
    behaviors: [eventsMixin({ defaultEvents })],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-input',
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
        type: {
            type: String,
            value: 'text',
        },
        password: {
            type: Boolean,
            value: false,
        },
        placeholder: {
            type: String,
            value: '',
        },
        placeholderStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
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
        },
        confirmType: {
            type: String,
            value: 'done',
        },
        alwaysEmbed: {
            type: Boolean,
            value: false,
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
        holdKeyboard: {
            type: Boolean,
            value: false,
        },
        safePasswordCertPath: {
            type: String,
            value: null,
        },
        safePasswordLength: {
            type: Number,
            value: null,
        },
        safePasswordTimeStamp: {
            type: Number,
            value: null,
        },
        safePasswordNonce: {
            type: String,
            value: null,
        },
        safePasswordSalt: {
            type: String,
            value: null,
        },
        safePasswordCustomHash: {
            type: String,
            value: null,
        },
        clear: {
            type: Boolean,
            value: false,
        },
        error: {
            type: Boolean,
            value: false,
        },
        labelWrap: {
            type: Boolean,
            value: false,
        },
        requiredMark: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        inputValue: '',
        inputFocus: false,
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, disabled, inputFocus, error, labelWrap, requiredMark', function(prefixCls, disabled, inputFocus, hasError, labelWrap, requiredMark) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--error`]: hasError,
            })
            const label = classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap,
                [`${prefixCls}__label--required`]: requiredMark,
            })
            const control = `${prefixCls}__control`
            const item = `${prefixCls}__item`
            const clear = `${prefixCls}__clear`
            const error = `${prefixCls}__error`
            const extra = `${prefixCls}__extra`

            return {
                wrap,
                label,
                control,
                item,
                clear,
                error,
                extra,
            }
        }],
    },
    methods: {
        updated(inputValue) {
            if (this.hasFieldDecorator) return
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        onChange(e) {
            const { value } = e.detail

            if (!this.data.controlled) {
                this.updated(value)
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
        onKeyboardHeightChange(e) {
            this.triggerEvent('keyboardheightchange', e.detail)
        },
        onNicknameReview(e) {
            this.triggerEvent('nicknamereview', e.detail)
        },
        onClear(e) {
            const params = { value: '' }

            if (!this.data.controlled) {
                this.updated(params.value)
            }

            this.triggerEvent('change', params)
            this.triggerEvent('clear', params)
        },
        onError() {
            const { inputValue: value } = this.data
            this.triggerEvent('error', { value })
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
})
