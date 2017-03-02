const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxPicker = App.Wux().$wuxPicker
		this.$wuxPickerCity = App.Wux().$wuxPickerCity
	},
	onTapDefault() {
		const that = this
		that.$wuxPicker.init('default', {
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
		that.$wuxPicker.init('multi', {
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
		that.$wuxPickerCity.init('city', {
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