import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/mixins/popupMixin'
import { props } from '../date-picker-view/props'
import { modeRecord, isTillNow } from '../date-picker-view/utils'
import { formatDate } from './utils'

const platformProps = {
    labelPropName: 'label',
    format(values, props) {
        if (isTillNow(values.value)) {
            return values.displayValue[0]
        }
        return formatDate(values.date, modeRecord[props.mode])
    },
}

baseComponent({
    behaviors: [popupMixin('#wux-picker', platformProps)],
    properties: props,
})
