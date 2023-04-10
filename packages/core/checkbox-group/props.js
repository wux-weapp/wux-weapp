export const props = {
    prefixCls: {
        type: String,
        value: 'wux-checkbox-group',
    },
    cellGroupPrefixCls: {
        type: String,
        value: 'wux-cell-group',
    },
    value: {
        type: Array,
        value: [],
    },
    title: {
        type: String,
        value: '',
    },
    label: {
        type: String,
        value: '',
    },
    options: {
        type: Array,
        value: [],
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    readOnly: {
        type: Boolean,
        value: false,
    },
    mode: {
        type: String,
        value: 'default',
    },
    bodyStyle: {
        type: [String, Object],
        value: '',
    },
}
