import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/mixins/popupMixin'
import { props } from '../date-picker-view/props'
import { isTillNow } from '../date-picker-view/utils'
import { formatDate } from './utils'

const platformProps = {
    labelPropName: 'label',
    format(values, props) {
        if (isTillNow(values.value)) {
            return values.displayValue[0]
        }
        const o = {
            datetime: 'yyyy-MM-dd hh:mm',
            date: 'yyyy-MM-dd',
            year: 'yyyy',
            month: 'yyyy-MM',
            time: 'hh:mm',
        }
        return formatDate(values.date, o[props.mode])
    },
}

baseComponent({
    behaviors: [popupMixin('#wux-picker', platformProps)],
    properties: props,
})
