export const defaultFieldNames = {
    label: 'label',
    value: 'value',
    children: 'children',
}

export const props = {
    prefixCls: {
        type: String,
        value: 'wux-picker',
    },
    defaultValue: {
        type: Array,
        value: [],
    },
    value: {
        type: Array,
        value: [],
    },
    controlled: {
        type: Boolean,
        value: false,
    },
    itemHeight: {
        type: Number,
        value: 34,
    },
    itemStyle: {
        type: [String, Object, Array],
        value: '',
    },
    indicatorStyle: {
        type: [String, Object, Array],
        value: '',
    },
    indicatorClass: {
        type: String,
        value: '',
    },
    maskStyle: {
        type: [String, Object, Array],
        value: '',
    },
    maskClass: {
        type: String,
        value: '',
    },
    labelAlign: {
        type: String,
        value: 'center',
    },
    defaultFieldNames: {
        type: Object,
        value: defaultFieldNames,
    },
    useValueProp: {
        type: Boolean,
        value: false,
    },
    loading: {
        type: Boolean,
        value: false,
    },
    options: {
        type: Array,
        value: [],
    },
}
