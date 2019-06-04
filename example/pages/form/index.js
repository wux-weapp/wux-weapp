import { $wuxForm } from '../../dist/index'

Page({
    data: {
        checkbox: ['1'],
        radio: '1',
        switch: true,
        disabled: false,
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
    formSubmit(e) {
        console.log('Default Form Submit \n', e.detail.value)
    },
    onSubmit() {
        const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
        const value = getFieldsValue()

        console.log('Wux Form Submit \n', value)
    },
    onChange(e) {
        const { form, changedValues, allValues } = e.detail

        console.log('onChange \n', changedValues, allValues)
    },
    onReset() {
        const { getFieldsValue, setFieldsValue } = $wuxForm()
        const fields = getFieldsValue()

        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (Array.isArray(fields[item])) {
                    fields[item] = []
                    if (item === 'slider') {
                        fields[item] = [10, 80]
                    }
                } else if (typeof fields[item] === 'boolean') {
                    fields[item] = false
                } else if (typeof fields[item] === 'number') {
                    fields[item] = 0
                } else {
                    fields[item] = ''
                }
            }
        }

        setFieldsValue({
            ...fields,
        })
    },
})
