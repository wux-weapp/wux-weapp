import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import eventsMixin from '../helpers/eventsMixin'
import styleToCssString from '../helpers/styleToCssString'
import bound from '../helpers/bound'
import { nativeInputProps } from './props'

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
        ...nativeInputProps,
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
        disabled: {
            type: Boolean,
            value: false,
        },
        readOnly: {
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
        labelWrap: {
            type: Boolean,
            value: false,
        },
        requiredMark: {
            type: Boolean,
            value: false,
        },
        onlyShowClearWhenFocus: {
            type: Boolean,
            value: true,
        },
        min: {
            type: Number,
            value: null,
        },
        max: {
            type: Number,
            value: null,
        },
    },
    data: {
        inputValue: '',
        inputFocus: false,
        shouldShowClear: false,
        internalPlaceholderStyle: '',
    },
    observers: {
        placeholderStyle(placeholderStyle) {
            this.setInternalPlaceholderStyle(placeholderStyle)
        },
        ['clear, disabled, readOnly, inputValue, inputFocus, onlyShowClearWhenFocus'](...args) {
            const [
                clear,
                disabled,
                readOnly,
                inputValue,
                inputFocus,
                onlyShowClearWhenFocus,
            ] = args

            this.setClear({
                clear,
                disabled,
                readOnly,
                inputValue,
                inputFocus,
                onlyShowClearWhenFocus,
            })
        },
    },
    computed: {
        classes: ['prefixCls, disabled, readOnly, inputFocus, error, labelWrap, requiredMark', function(prefixCls, disabled, readOnly, inputFocus, hasError, labelWrap, requiredMark) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--readonly`]: readOnly,
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
        setInternalPlaceholderStyle(placeholderStyle) {
            const internalPlaceholderStyle = styleToCssString(placeholderStyle)

            if (this.data.internalPlaceholderStyle !== internalPlaceholderStyle) {
                this.setData({
                    internalPlaceholderStyle,
                })
            }
        },
        setClear(props) {
            const shouldShowClear = (() => {
                if (!props.clear || !props.inputValue || props.disabled || props.readOnly) return false
                if (props.onlyShowClearWhenFocus) {
                    return props.inputFocus
                } else {
                    return true
                }
            })()
            if (this.data.shouldShowClear !== shouldShowClear) {
                this.setData({
                    shouldShowClear,
                })
            }
        },
        checkValue() {
            const props = this.data
            const { inputValue: value } = props
            let nextValue = value
            if (props.type === 'number' || props.type === 'digit') {
                nextValue =
                    nextValue &&
                    bound(
                        parseFloat(nextValue),
                        props.min !== null ? props.min : undefined,
                        props.max !== null ? props.max : undefined
                    ).toString()
            }
            if (nextValue !== value) {
                if (!this.data.controlled) {
                    this.updated(nextValue)
                }
                this.triggerEvent('change', { value: nextValue })
            }
        },
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
            this.checkValue()
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
        onClear() {
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
        const { defaultValue, value, controlled, placeholderStyle } = this.data
        const inputValue = controlled ? value : defaultValue

        this.updated(inputValue)
        this.setClear({ ...this.data, inputValue })
        this.setInternalPlaceholderStyle(placeholderStyle)
    },
})
