import * as picker from '../picker-view/props'

export const defaultFieldNames = picker.defaultFieldNames
export const props = {
	...picker.props,
	prefixCls: {
        type: String,
        value: 'wux-picker',
    },
    pickerPrefixCls: {
        type: String,
        value: 'wux-picker-col',
    },
    value: {
        type: Array,
        value: [],
    },
}