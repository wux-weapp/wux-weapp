import { $wuxCalendar } from '../../dist/index'

Page({
    data: {
        value1: [],
        value2: [],
        value3: [],
        value4: [],
    },
    openCalendar1() {
        $wuxCalendar().open({
            value: this.data.value1,
            onChange: (values, displayValues) => {
                console.log('onChange', values, displayValues)
                this.setData({
                    value1: displayValues,
                })
            },
        })
    },
    openCalendar2() {
        $wuxCalendar().open({
            value: this.data.value2,
            multiple: true,
            onChange: (values, displayValues) => {
                console.log('onChange', values, displayValues)
                this.setData({
                    value2: displayValues,
                })
            },
        })
    },
    openCalendar3() {
        $wuxCalendar().open({
            value: this.data.value3,
            direction: 'vertical',
            onChange: (values, displayValues) => {
                console.log('onChange', values, displayValues)
                this.setData({
                    value3: displayValues,
                })
            },
        })
    },
    openCalendar4() {
        const now = new Date()
        const minDate = now.getTime()
        const maxDate = now.setDate(now.getDate() + 7)

        $wuxCalendar().open({
            value: this.data.value4,
            minDate,
            maxDate,
            onChange: (values, displayValues) => {
                console.log('onChange', values, displayValues)
                this.setData({
                    value4: displayValues,
                })
            },
        })
    },
})