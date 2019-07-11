Page({
	data: {
        value1: [],
        value2: [],
        value3: [],
        value4: [],
        value5: [],
        value6: [],
        value7: [],
        value8: [],
        value9: [],
        displayValue1: '请选择',
        displayValue2: '请选择',
        displayValue3: '请选择',
        displayValue4: '请选择',
        displayValue5: '请选择',
        displayValue6: '请选择',
        displayValue7: '请选择',
        displayValue8: '请选择',
        displayValue9: '请选择',
        lang: 'zh_CN',
	},
    onChange(e) {
        console.log(e)
        const { key, values } = e.detail
        const lang = values[key]

        this.setData({
            lang,
        })
    },
    setValue(values, key, mode) {
        this.setData({
            [`value${key}`]: values.value,
            [`displayValue${key}`]: values.label,
            // [`displayValue${key}`]: values.displayValue.join(' '),
        })
    },
    onConfirm(e) {
        const { index, mode } = e.currentTarget.dataset
        this.setValue(e.detail, index, mode)
        console.log(`onConfirm${index}`, e.detail)
    },
    onVisibleChange(e) {
        this.setData({ visible: e.detail.visible })
    },
    onClick() {
        this.setData({ visible: true })
    },
})
