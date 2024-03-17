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
        datePicker: [],
        // datePicker: [year, month, day, hour, minute],
        popupSelect: '',
        options1: [],
        options2: ['顺丰速运', '中通快递', '圆通快递', '申通快递', '韵达快递', '天天快递', '京东物流'],
        layout: 'horizontal',
        validateMessages: {
            required: '%s 字段为必填',
        },
        confirmDirty: false,
    },
    onLoad() {
        this.setData({ options1: data })
    },
    onSegmentedControlChange(e) {
        console.log(e)
        const { key, values } = e.detail
        const layout = values[key]

        this.setData({
            layout,
        })
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
    onPickerChange(e) {
        this.setData({ picker: e.detail.value, pickerLabel: e.detail.label })
    },
    onDatePickerChange(e) {
        this.setData({ datePicker: e.detail.value, datePickerLabel: e.detail.label })
    },
    onArrowClick() {
        const { setFieldsValue } = $wuxForm()
        setFieldsValue({ datePicker: [] })
        this.setValues({ datePicker: [] }, true)
    },
    onPopupSelectChange(e) {
        this.setData({ popupSelect: e.detail.value, popupSelectLabel: e.detail.label })
    },
    onSelectableChange(e) {
        this.setData({ checkEmail: e.detail.checked }, () => {
            const form = $wuxForm()
            form.validateFields(['email'], { force: true })
        })
    },
    formSubmit(e) {
        console.log('Default Form Submit \n', e.detail.value)
    },
    onSubmit() {
        const { validateFields } = $wuxForm()
        validateFields((err, values) => {
            if (!err) {
                wx.showModal({
                    content: JSON.stringify(values, null, 2),
                    showCancel: !1,
                })
                console.log('Received values of form: ', values);
            }
        })
    },
    onValuesChange(e) {
        const { changedValues, allValues } = e.detail
        this.setValues(changedValues)

        console.log('onValuesChange \n', changedValues, allValues)
    },
    onFieldsChange(e) {
        console.log('onFieldsChange \n', e.detail)
    },
    onReset() {
        const { getFieldsValue, resetFields } = $wuxForm()
        resetFields()
        const values = getFieldsValue()
        this.setValues({ ...values, checkEmail: false })

        console.log('Wux Form Reset \n', values)
    },
    onFill() {
        const { setFieldsValue } = $wuxForm()
        setFieldsValue({
            code: this.data.codeMSG || '1234',
        })
    },
    setValues(changedValues, clearLabel) {
        Object.keys(changedValues).forEach((field) => {
            this.setData(clearLabel ? {
                [field]: changedValues[field],
                [`${field}Label`]: null,
            }: {
                [field]: changedValues[field],
            })
        })
    },
    onSendCode() {
        const NUMBER_STRING = '0123456789';
        const randomNum = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
        }
        const codeMSG = [...new Array(4)].map(_ => NUMBER_STRING[randomNum(0, NUMBER_STRING.length)]).join('')
      
        this.setData({
            codeMSG,
        })
        wx.showModal({
            content: `【WuxUI】验证码：${codeMSG}，有效期10分钟，请勿泄露。`,
            showCancel: !1,
        })
    },
    checkCode(rule, value) {
        if (!value) {
            return Promise.reject(new Error('验证码不能为空!'))
        }
        if (this.data.codeMSG && value === this.data.codeMSG) {
            return Promise.resolve()
        }
        return Promise.reject(new Error('验证码输入错误!'))
    },
    validateToNextPassword(rule, value, callback){
        const form = $wuxForm()
        if (value && this.data.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    },
    compareToFirstPassword(rule, value, callback) {
        const form = $wuxForm()
        if (value && value !== form.getFieldValue('password')) {
            callback('您输入的两个密码不一致！')
        } else {
            callback()
        }
    },
    handleConfirmBlur(e) {
        const { value } = e.detail
        this.setData({ confirmDirty: this.data.confirmDirty || !!value })
    },
})
