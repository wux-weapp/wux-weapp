import ad from '../index/ad'

let itemCount = 100
let items = [...new Array(itemCount)].map((v, i) => ({
    value: `item_${i}`,
    title: `#item_${i}`,
}))

ad({
    data: {
        value1: '学生',
        value2: [],
        value3: [],
        value4: '',
        value5: '',
        value6: ['item_2'],
        displayValue1: '请选择',
        displayValue2: '请选择',
        displayValue3: '请选择',
        displayValue4: '请选择',
        displayValue5: '请选择',
        displayValue6: '请选择',
        options1: ['法官', '医生', '猎人', '学生', '记者', '其他'],
        options2: [{
            title: 'iPhone 3GS',
            value: '001',
        }, {
            title: 'iPhone 5',
            value: '002',
        }, {
            title: 'iPhone 5S',
            value: '003',
            disabled: true,
        }, {
            title: 'iPhone 6',
            value: '004',
        }, {
            title: 'iPhone 6S',
            value: '005',
        }, {
            title: 'iPhone 6P',
            value: '006',
            disabled: true,
        }, {
            title: 'iPhone 6SP',
            value: '007',
        }, {
            title: 'iPhone SE',
            value: '008',
        }, {
            title: 'iPhone 7',
            value: '009',
        }],
        options3: [{
            title: '画画',
            value: '1',
        }, {
            title: '打球',
            value: '2',
        }, {
            title: '唱歌',
            value: '3',
        }, {
            title: '游泳',
            value: '4',
        }, {
            title: '健身',
            value: '5',
        }, {
            title: '睡觉',
            value: '6',
        }],
        options4: [
            {
                title: '富二代',
                options: [
                    { title: '王撕葱', value: 'wang' },
                    { title: '秦愤', value: 'qin' },
                ],
            },
            {
                title: '练习生',
                options: [
                    { title: '蔡🏀', value: 'cai' },
                    { title: '赵四', value: 'zhao', disabled: true },
                ],
            },
        ],
        options5: [],
        options6: items,
    },
    setValue(values, key) {
        this.setData({
            [`value${key}`]: values.value,
            [`displayValue${key}`]: values.label,
        })
    },
    onConfirm(e) {
        const { index } = e.currentTarget.dataset
        this.setValue(e.detail, index)
        console.log(`onConfirm${index}`, e.detail)
    },
    onValueChange(e) {
        const { index } = e.currentTarget.dataset
        console.log(`onValueChange${index}`, e.detail)
    },
    onVisibleChange(e) {
        this.setData({ visible: e.detail.visible })
    },
    onClick() {
        this.setData({ visible: true })
    },
    onVisibleChange5(e) {
        if (e.detail.visible && !this.data.options5.length) {
            setTimeout(() => {
                this.setData({
                    options5: this.data.options1,
                    value5: this.data.options1[1],
                })
            }, 3000)
        }
    },
})
