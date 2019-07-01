import { $wuxDatePicker, $wuxPopupPicker } from '../../dist/index'
import data from '../cascader/data'

Page({
	data: {
        value1: [],
        value2: [],
        value3: [],
        options: [],
        province: [],
        loading: true,
	},
    onLoad() {
        this.setData({ options: data })
        setTimeout(() => {
            this.setData({
                province: data.map((v, i) => ({ ...v, disabled: i > 3, children: null })),
                loading: false,
            })
        }, 3000)
    },
    onChange1(e) {
        this.setData({ value1: e.detail.value })
        console.log('onChange1', e.detail)
    },
    onChange2(e) {
        this.setData({ value2: e.detail.value })
        console.log('onChange2', e.detail)
    },
    onChange3(e) {
        this.setData({ value3: e.detail.value })
        console.log('onChange3', e.detail)
    },
})
