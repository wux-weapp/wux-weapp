import { DEFAULT_TRIGGER } from '../helpers/shared/constants'

export const props = {
    prefixCls: {
        type: String,
        value: 'wux-field',
    },
    initialValue: {
        type: null,
        value: null,
    },
    valuePropName: {
        type: String,
        value: 'inputValue',
    },
    trigger: {
        type: String,
        value: DEFAULT_TRIGGER,
    },
    validate: {
        type: Array,
        value: [],
    },
    validateTrigger: {
        type: [String, Array],
        value: DEFAULT_TRIGGER,
    },
    preserve: {
        type: Boolean,
        value: false,
    },
    rules: {
        type: Array,
        value: [],
    },
    validateFirst: {
        type: Boolean,
        value: false,
    },
    hidden: {
        type: Boolean,
        value: false,
    },
    childElementPosition: {
        type: String,
        value: 'none',
    },
    cellPrefixCls: {
        type: String,
        value: 'wux-cell',
    },
    label: {
        type: String,
        value: '',
    },
    labelWrap: {
        type: Boolean,
        value: false,
    },
    extra: {
        type: String,
        value: '',
    },
    isLink: {
        type: Boolean,
        value: false,
    },
    align: {
        type: String,
        value: 'flex-start',
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    readOnly: {
        type: Boolean,
        value: false,
    },
}
