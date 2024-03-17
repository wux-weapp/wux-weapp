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
    hasLine: {
        type: Boolean,
        value: true,
    },
    withListComponent: {
        type: Boolean,
        value: true,
    },
    iconPosition: {
        type: String,
        value: 'left',
    },
    iconSize: {
        type: String,
        value: '',
    },
    iconOn: {
        type: String,
        value: '',
    },
    iconOff: {
        type: String,
        value: '',
    },
}
