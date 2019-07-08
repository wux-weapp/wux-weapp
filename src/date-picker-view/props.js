export const props = {
    prefixCls: {
        type: String,
        value: 'wux-date-picker',
    },
    multiPickerPrefixCls: {
        type: String,
        value: 'wux-picker',
    },
    pickerPrefixCls: {
        type: String,
        value: 'wux-picker-col',
    },
    value: {
        type: null,
        value: null,
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
    mode: {
        type: String,
        value: 'datetime',
    },
    minuteStep: {
        type: Number,
        value: 1,
    },
    use12Hours: {
        type: Boolean,
        value: false,
    },
    minDate: {
        type: null,
        value: null,
    },
    maxDate: {
        type: null,
        value: null,
    },
    minHour: {
        type: Number,
        value: 0,
    },
    maxHour: {
        type: Number,
        value: 23,
    },
    minMinute: {
        type: Number,
        value: 0,
    },
    maxMinute: {
        type: Number,
        value: 59,
    },
    lang: {
        type: String,
        value: 'zh_CN',
    },
}
