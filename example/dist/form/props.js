export const props = {
    prefixCls: {
        type: String,
        value: 'wux-form',
    },
    cellGroupPrefixCls: {
        type: String,
        value: 'wux-cell-group',
    },
    title: {
        type: String,
        value: '',
    },
    label: {
        type: String,
        value: '',
    },
    mode: {
        type: String,
        value: 'default',
    },
    bodyStyle: {
        type: [String, Object],
        value: '',
    },
    layout: {
        type: String,
        value: 'none',
    },
    validateMessages: {
        type: null,
        value: null,
    },
    requiredMarkStyle: {
        type: String,
        value: 'asterisk',
    },
    asteriskText: {
        type: String,
        value: '*',
    },
    requiredText: {
        type: String,
        value: '必填',
    },
    optionalText: {
        type: String,
        value: '选填',
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
