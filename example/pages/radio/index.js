import ad from '../index/ad'

ad({
    data: {
        value1: '1',
        value2: '1',
        value3: '1',
        value4: '1',
        value5: '1',
        value6: '1',
        options: [{ title: 'Java', value: '1' }, { title: 'PHP', value: '2' }],
        // options: ['1', '2'],
        iconPosition: 'right',
    },
    onSegmentedControlChange(e) {
        console.log(e)
        const { key, values } = e.detail
        const iconPosition = values[key]

        this.setData({
            iconPosition,
        })
    },
    onChange(field, e) {
        this.setData({
            [field]: e.detail.value,
        })

        console.log('radio发生change事件，携带value值为：', e.detail)
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
    onItemClick(e) {
        const { radioRef } = e.currentTarget.dataset
        const ref = this.selectComponent(`#${radioRef}`)
        if (this.data.value6 !== ref.data.value) {
            this.setData({
                value6: ref.data.value,
            })
        }
        console.log('onItemClick', ref)
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
})
