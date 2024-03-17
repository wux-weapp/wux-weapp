import { fieldNamesProps } from '../helpers/mixins/fieldNamesBehavior'

export const props = {
    prefixCls: {
        type: String,
        value: 'wux-picker-col',
    },
    defaultValue: {
        type: String,
        value: '',
    },
    value: {
        type: String,
        value: '',
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
    loading: {
        type: Boolean,
        value: false,
    },
    options: {
        type: Array,
        value: [],
    },
    ...fieldNamesProps,
}
