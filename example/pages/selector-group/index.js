import ad from '../index/ad'

const options = [
    {
        label: '选项一',
        value: '1',
    },
    {
        label: '选项二',
        value: '2',
    },
    {
        label: '选项三',
        value: '3',
    },
]

const stringOptions = options.map((option) => option.label)
const descriptionOptions = options.map((option) => ({ ...option, desc: '描述信息' }))
const disabledOptions = options.map((option) => ({ ...option, disabled: true }))

const fieldNamesOptions = [
    {
        labelT: '选项一',
        valueT: '1',
    },
    {
        labelT: '选项二',
        valueT: '2',
    },
    {
        labelT: '选项三',
        valueT: '3',
        disabledT: true,
    },
]

ad({
    data: {
        fieldNames: {
            label: 'labelT',
            value: 'valueT',
            disabled: 'disabledT',
        },
        fieldNamesOptions,
        stringOptions,
        descriptionOptions,
        disabledOptions,
        options,
        value1: ['选项一'],
        value2: ['1'],
        value3: ['2', '3'],
        value4: ['3'],
        value5: ['1'],
    },
    onChange(e) {
        console.log('onChange', e.detail)
        this.setData({
            value4: e.detail.value,
        })
    },
    onRadioChange(e) {
        console.log('onChange', e.detail)
        const { value } = e.detail
        if (value.length) {
            this.setData({
                value5: value,
            })
        }
    },
})
