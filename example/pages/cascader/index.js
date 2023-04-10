import data from './data'

import ad from '../index/ad'

ad({
    data: {
        options1: data.slice(0, 2),
        value1: [],
        value1: ['110000', '110000', '110102'],
        title1: '请选择',
        options2: [
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
        value2: [],
        title2: '请选择',
        options3: data.slice(0, 2),
        value3: [],
        title3: '请选择',
    },
    onOpen1() {
        this.setData({ visible1: true })
    },
    onClose1() {
        this.setData({ visible1: false })
        console.log('onClose1')
    },
    onChange1(e) {
        console.log('onChange1', e.detail)
    },
    onConfirm1(e) {
        console.log('onConfirm1', e.detail)
        this.setData({ title1: e.detail.options.map((n) => n.label).join('/') })
    },
    onOpen2() {
        this.setData({ visible2: true })
    },
    onClose2() {
        this.setData({ visible2: false })
    },
    onChange2(e) {
        console.log('onChange2', e.detail)
        this.setData({ value2: e.detail.value, title2: e.detail.done ? e.detail.options.map((n) => n.label).join('/') : '请选择' })
    },
    onLoadOptions(e) {
        console.log('onLoadOptions', e.detail)
        const { value } = e.detail
        const options2 = [...this.data.options2]

        wx.showLoading({ mask: true })

        setTimeout(() => {
            if (value[value.length - 1] === 'beijing') {
                options2.forEach((n) => {
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
                options2.forEach((n) => {
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

            this.setData({ value2: value, options2 })
        }, 1000)
    },
    onOpen3() {
        this.setData({ visible3: true })
    },
    onClose3() {
        this.setData({ visible3: false })
        console.log('onClose3')
    },
    onChange3(e) {
        console.log('onChange3', e.detail)
    },
    onConfirm3(e) {
        console.log('onConfirm3', e.detail)
        this.setData({ value3: e.detail.value, title3: e.detail.options.map((n) => n.label).join('/') })
    },
    onTabsChange3(e) {
        console.log('onTabsChange3', e.detail)
    },
})
