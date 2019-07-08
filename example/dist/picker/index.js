import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import { props } from '../multi-picker-view/props'

baseComponent({
    behaviors: [popupMixin()],
    properties: {
        ...props,
        prefixCls: {
            type: String,
            value: 'wux-popup-picker',
        },
        multiPickerPrefixCls: {
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
