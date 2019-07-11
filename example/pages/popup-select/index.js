Page({
    data: {
        value1: '',
        value2: '',
        value3: '',
        displayValue1: '请选择',
        displayValue2: '请选择',
        displayValue3: '请选择',
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
        }, {
            title: 'iPhone 6',
            value: '004',
        }, {
            title: 'iPhone 6S',
            value: '005',
        }, {
            title: 'iPhone 6P',
            value: '006',
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
})
