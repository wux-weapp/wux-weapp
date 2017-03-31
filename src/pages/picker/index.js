import { $wuxPicker, $wuxPickerCity } from '../../components/wux'

Page({
	data: {},
	onLoad() {},
	onTapDefault() {
		const that = this
		$wuxPicker.init('default', {
			items: ['飞机票', '火车票', '的士票', '住宿费', '礼品费', '活动费', '通讯费', '补助', '其他'],
		    onChange(value, values) {
				console.log(value, values)
				that.setData({
					default: values
				})
			},
		})
	},
	onTapMulti() {
		const that = this
		$wuxPicker.init('multi', {
			items: [
				['1', '2', '3'],
				['A', 'B', 'C'],
			],
			value: [0, 1],
			onChange(value, values) {
				console.log(value, values)
				that.setData({
					multi: values
				})
			},
		})
	},
	onTapCity() {
		const that = this
		$wuxPickerCity.init('city', {
			title: '请选择目的地', 
			value: [8, 0, 11],
		    onChange(value, values, displayValues) {
				console.log(value, values, displayValues)
				that.setData({
					city: displayValues
				})
			},
		})
	},
})