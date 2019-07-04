import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import props from '../date-picker-view/props'
import { formatDate } from './utils'

const platformProps = {
    pickerValueProp: 'value',
    format(values, props) {
        const o = {
            datetime: 'yyyy-MM-dd hh:mm',
            date: 'yyyy-MM-dd',
            year: 'yyyy',
            month: 'MM-dd',
            time: 'hh:mm',
        }
        return formatDate(values.date, o[props.mode])
    },
}

baseComponent({
    behaviors: [popupMixin('#wux-picker', platformProps)],
    properties: {
        ...props,
        prefixCls: {
            type: String,
            value: 'wux-date-picker',
        },
    },
})
