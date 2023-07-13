import { $wuxForm } from '../../dist/index'
import data from '../cascader/data'

import ad from '../index/ad'

function getDateString(date = new Date) {
    return {
        year: date.getFullYear() + '',
        month: date.getMonth() + '',
        day: date.getDate() + '',
        hour: date.getHours() + '',
        minute: date.getMinutes() + '',
    }
}

const { year, month, day, hour, minute } = getDateString()

ad({
    data: {
        checkbox: ['1'],
        radio: '1',
        switch: true,
        picker: [],
        datePicker: [year, month, day, hour, minute],
        popupSelect: '猎人',
        options1: [],
        options2: ['法官', '医生', '猎人', '学生', '记者', '其他'],
    },
    onLoad() {
        this.setData({ options1: data })
    },
    onCheckboxChange(e) {
        const { value } = e.detail
        const data = this.data.checkbox
        const index = data.indexOf(value)
        const checkbox = index === -1 ? [...data, value] : data.filter((n) => n !== value)

        this.setData({ checkbox })
    },
    onRadioChange(e) {
        this.setData({ radio: e.detail.value })
    },
    onSwitchChange(e) {
        this.setData({ switch: e.detail.value })
    },
    onValueChange(e) {
        this.setData({ picker: e.detail.value })
    },
    onDatePickerChange(e) {
        this.setData({ datePicker: e.detail.value })
    },
    onPopupSelectChange(e) {
        this.setData({ popupSelect: e.detail.value })
    },
    formSubmit(e) {
        console.log('Default Form Submit \n', e.detail.value)
    },
    onSubmit() {
        const { getFieldsValue } = $wuxForm()
        const value = getFieldsValue()

        console.log('Wux Form Submit \n', value)
    },
    onValuesChange(e) {
        const { changedValues, allValues } = e.detail
        this.setDataFromValue(changedValues)

        console.log('onValuesChange \n', changedValues, allValues)
    },
    onReset() {
        const { getFieldsValue, resetFields } = $wuxForm()
        resetFields()
        const value = getFieldsValue()
        this.setDataFromValue(value)

        console.log('Wux Form Reset \n', value)
    },
    onFill() {
        const { setFieldsValue } = $wuxForm()
        setFieldsValue({
            textarea: 'Hello wux! Hello wux! Hello wux!',
        })
    },
    setDataFromValue(changedValues) {
        Object.keys(changedValues).forEach((field) => {
            this.setData({
                [field]: changedValues[field],
            })
        })
    },
})
