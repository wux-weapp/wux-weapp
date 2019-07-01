function getDateString(date = new Date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    }
}

const { year, month, day, hour, minute } = getDateString()

Page({
	data: {
        value1: [year, month, day, hour, minute],
        value2: [year, month, day],
        value3: [year, month],
        value4: [year],
        value5: [hour, minute],
        value6: [year, month, day, hour, minute, '1'],
        value7: [hour, minute, '1'],
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
    setValue(values, key) {
        this.setData({
            [`value${key}`]: values.value,
            [`displayValue${key}`]: values.displayValue.join(' '),
        })
    },
    onChange1(e) {
        this.setValue(e.detail, '1')
        console.log('onChange1', e.detail)
    },
    onChange2(e) {
        this.setValue(e.detail, '2')
        console.log('onChange2', e.detail)
    },
    onChange3(e) {
        this.setValue(e.detail, '3')
        console.log('onChange3', e.detail)
    },
    onChange4(e) {
        this.setValue(e.detail, '4')
        console.log('onChange4', e.detail)
    },
    onChange5(e) {
        this.setValue(e.detail, '5')
        console.log('onChange5', e.detail)
    },
    onChange6(e) {
        this.setValue(e.detail, '6')
        console.log('onChange6', e.detail)
    },
    onChange7(e) {
        this.setValue(e.detail, '7')
        console.log('onChange7', e.detail)
    },
})
