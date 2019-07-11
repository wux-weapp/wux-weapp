import { $wuxSelect } from '../../dist/index'

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
    onClick1() {
        $wuxSelect('#wux-select1').open({
            value: this.data.value1,
            options: this.data.options1,
            onConfirm: (value, index, options) => {
                console.log('onConfirm', value, index, options)
                if (index !== -1) {
                    this.setData({
                        value1: value,
                        displayValue1: options[index],
                    })
                }
            },
        })
    },
    onClick2() {
        $wuxSelect('#wux-select2').open({
            value: this.data.value2,
            multiple: true,
            options: this.data.options2,
            onConfirm: (value, index, options) => {
                console.log('onConfirm', value, index, options)
                if (index !== -1) {
                    this.setData({
                        value2: value,
                        displayValue2: index.map((n) => options[n].title),
                    })
                }
            },
        })
    },
    onClick3() {
        $wuxSelect('#wux-select3').open({
            value: this.data.value3,
            multiple: true,
            toolbar: {
                title: 'Please choose',
                confirmText: 'ok',
            },
            max: 3,
            options: this.data.options3,
            onChange: (value, index, options) => {
                console.log('onChange', value, index, options)
                this.setData({
                    value3: value,
                    displayValue3: index.map((n) => options[n].title),
                })
            },
            onConfirm: (value, index, options) => {
                console.log('onConfirm', value, index, options)
                this.setData({
                    value3: value,
                    displayValue3: index.map((n) => options[n].title),
                })
            },
        })
    },
})
