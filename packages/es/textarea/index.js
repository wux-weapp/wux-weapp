import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import eventsMixin from '../helpers/mixins/eventsMixin'
import styleToCssString from '../helpers/libs/styleToCssString'
import { useRect } from '../helpers/hooks/useDOM'
import { nativeTextareaProps } from './props'

const defaultEvents = {
    onChange() {},
    onFocus() {},
    onBlur() {},
    onConfirm() {},
    onClear() {},
    onError() {},
    onLineChange() {},
}

baseComponent({
    behaviors: [eventsMixin({ defaultEvents })],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
    },
    properties: {
        ...nativeTextareaProps,
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
        disabled: {
            type: Boolean,
            value: false,
        },
        readOnly: {
            type: Boolean,
            value: false,
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
        internalPlaceholderStyle: '',
    },
    observers: {
        placeholderStyle(placeholderStyle) {
            this.setInternalPlaceholderStyle(placeholderStyle)
        },
    },
    computed: {
        classes: ['prefixCls, disabled, readOnly, inputFocus, error, hasCount', function(prefixCls, disabled, readOnly, inputFocus, hasError, hasCount) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--readonly`]: readOnly,
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
            const keyboardAccessory = `${prefixCls}__keyboard-accessory`

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
                keyboardAccessory,
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
        updateHeight(val = this.data.rows) {
            // rows 取值为大于或等于 1 的正整数
            const rows = Math.max(1, parseInt(val))
            const { prefixCls, inputRows } = this.data

            if (inputRows !== rows) {
                useRect(`.${prefixCls}__item`, this)
                    .then((rect) => {
                        if (rect) {
                            const lineHeight = inputRows > 1 ? rect.height / inputRows : rect.height
                            const inputHeight = lineHeight * rows

                            this.setData({
                                inputRows: rows,
                                inputHeight,
                            })
                        }
                    })
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
            this.triggerEvent('blur', e.detail)
        },
        onConfirm(e) {
            this.triggerEvent('confirm', e.detail)
        },
        onKeyboardHeightChange(e) {
            this.triggerEvent('keyboardheightchange', e.detail)
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
        const { defaultValue, value, controlled, placeholderStyle } = this.data
        const inputValue = controlled ? value : defaultValue

        this.updated(inputValue)
        this.setInternalPlaceholderStyle(placeholderStyle)
    },
    ready() {
        this.updateHeight()
    },
})
