import ad from '../index/ad'

const seasons = [
    ['王', '马', '蔡'],
    ['撕葱', '粑粑', '🏀'],
]

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
        value: '🏀',
        options: seasons,
        fieldNames: {
            label: 'labelT',
            value: 'valueT',
            disabled: 'disabledT',
        },
        fieldNamesOptions,
    },
    onValueChange(e) {
        this.setData({ value: e.detail.value })
        console.log('onValueChange', e.detail)
    },
})
