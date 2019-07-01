import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import { props } from '../picker-view/props'

baseComponent({
    behaviors: [popupMixin()],
    properties: {
        ...props,
        prefixCls: {
            type: String,
            value: 'wux-popup-picker',
        },
        pickerPrefixCls: {
            type: String,
            value: 'wux-picker',
        },
        cascade: {
            type: Boolean,
            value: false,
        },
        cols: {
            type: Number,
            value: 3,
        },
    },
})
