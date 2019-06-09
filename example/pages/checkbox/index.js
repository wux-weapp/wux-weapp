Page({
    data: {
        value1: ['1'],
        value2: ['1'],
        value3: ['1'],
        value4: ['1'],
        value5: ['1'],
        options: [{ title: 'Java', value: '1' }, { title: 'PHP', value: '2' }],
        // options: ['1', '2'],
    },
    onChange(field, e) {
        const { value } = e.detail
        const data = this.data[field]
        const index = data.indexOf(value)
        const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

        this.setData({
            [field]: current,
        })

        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    onChange1(e) {
        this.onChange('value1', e)
    },
    onChange2(e) {
        this.onChange('value2', e)
    },
    onChange3(e) {
        this.onChange('value3', e)
    },
    onChange4(e) {
        this.onChange('value4', e)
    },
    onChange5(e) {
        this.onChange('value5', e)
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
})
