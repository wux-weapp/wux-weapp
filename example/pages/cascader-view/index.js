import ad from '../index/ad'
import data from './data'

const fieldNamesOptions = [
    {
        labelT: '选项一',
        valueT: '1',
        childrenT: [{
            labelT: '选项一(1)',
            valueT: '11',
        }],
    },
    {
        labelT: '选项二',
        valueT: '2',
        childrenT: [{
            labelT: '选项二(2)',
            valueT: '22',
        }],
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
            children: 'childrenT',
        },
        fieldNamesOptions,
        options1: data,
        value2: ['浙江', '温州', '鹿城区'],
        options2: data,
        value3: [],
        options3: [
            {
                value: 'beijing',
                label: '北京',
                isLeaf: false,
            },
            {
                value: 'hangzhou',
                label: '杭州',
                isLeaf: false,
            },
        ],
    },
    onChange1(e) {
        console.log('onChange1', e.detail)
    },
    onChange2(e) {
        this.setData({
            value2: e.detail.value,
        })
        console.log('onChange2', e.detail)
    },
    onTabsChange2(e) {
        console.log('onTabsChange2', e.detail)
    },
    onChange3(e) {
        this.setData({
            value3: e.detail.value,
        })
        console.log('onChange3', e.detail)
    },
    onLoadOptions(e) {
        console.log('onLoadOptions', e.detail)
        const { value } = e.detail
        const options3 = [...this.data.options3]

        wx.showLoading({ mask: true })

        setTimeout(() => {
            if (value[value.length - 1] === 'beijing') {
                options3.forEach((n) => {
                    if (n.value === 'beijing') {
                        n.children = [
                            {
                                value: 'baidu',
                                label: '百度',
                            },
                            {
                                value: 'sina',
                                label: '新浪',
                            },
                        ]
                    }
                })
            } else if (value[value.length - 1] === 'hangzhou') {
                options3.forEach((n) => {
                    if (n.value === 'hangzhou') {
                        n.children = [
                            {
                                value: 'ali',
                                label: '阿里巴巴',
                            },
                            {
                                value: '163',
                                label: '网易',
                            },
                        ]
                    }
                })
            }

            wx.hideLoading()

            this.setData({ value3: value, options3 })
        }, 1000)
    },
})
