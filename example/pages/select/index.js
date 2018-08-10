import { $wuxSelect } from '../../dist/index'

Page({
    data: {
        value1: '',
        title1: '',
        value2: '',
        title2: '',
        value3: '',
        title3: '',
    },
    onClick1() {
        $wuxSelect('#wux-select1').open({
            value: this.data.value1,
            options: [
                '法官',
                '医生',
                '猎人',
                '学生',
                '记者',
                '其他',
            ],
            onConfirm: (value, index, options) => {
                console.log(value, index, options)
                this.setData({
                    value1: value,
                    title1: options[index],
                })
            },
        })
    },
    onClick2() {
        $wuxSelect('#wux-select2').open({
            value: this.data.value2,
            options: [{
                    title: 'iPhone 3GS',
                    value: '001',
                },
                {
                    title: 'iPhone 5',
                    value: '002',
                },
                {
                    title: 'iPhone 5S',
                    value: '003',
                },
                {
                    title: 'iPhone 6',
                    value: '004',
                },
                {
                    title: 'iPhone 6S',
                    value: '005',
                },
                {
                    title: 'iPhone 6P',
                    value: '006',
                },
                {
                    title: 'iPhone 6SP',
                    value: '007',
                },
                {
                    title: 'iPhone SE',
                    value: '008',
                },
                {
                    title: 'iPhone 7',
                    value: '009',
                },
            ],
            onConfirm: (value, index, options) => {
                console.log(value, index, options)
                this.setData({
                    value2: value,
                    title2: options[index].title,
                })
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
            options: [{
                    title: '画画',
                    value: '1',
                },
                {
                    title: '打球',
                    value: '2',
                },
                {
                    title: '唱歌',
                    value: '3',
                },
                {
                    title: '游泳',
                    value: '4',
                },
                {
                    title: '健身',
                    value: '5',
                },
                {
                    title: '睡觉',
                    value: '6',
                },
            ],
            onConfirm: (value, index, options) => {
                console.log(value, index, options)
                this.setData({
                    value3: value,
                    title3: index.map((n) => options[n].title),
                })
            },
        })
    },
})