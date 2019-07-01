import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import props from '../date-picker-view/props'

baseComponent({
    behaviors: [popupMixin()],
    properties: {
        ...props,
        prefixCls: {
            type: String,
            value: 'wux-date-picker',
        },
    },
})
