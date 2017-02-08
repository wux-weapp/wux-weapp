const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxPicker = App.wux(this).$wuxPicker
		this.$wuxPickerCity = App.wux(this).$wuxPickerCity
	},
	onTapDefault() {
		const that = this
		that.$wuxPicker.render('default', {
			items: ['飞机票', '火车票', '的士票', '住宿费', '礼品费', '活动费', '通讯费', '补助', '其他'],
		    bindChange(value, values) {
				console.log(value, values)
				that.setData({
					default: values
				})
			},
		})
	},
	onTapMulti() {
		const that = this
		that.$wuxPicker.render('multi', {
			items: [
				['1', '2', '3'],
				['A', 'B', 'C'],
			],
			value: [0, 1],
			bindChange(value, values) {
				console.log(value, values)
				that.setData({
					multi: values
				})
			},
		})
	},
	onTapCity() {
		const that = this
		that.$wuxPickerCity.render('city', {
			title: '请选择目的地', 
			value: [8, 0, 11],
		    bindChange(value, values, displayValues) {
				console.log(value, values, displayValues)
				that.setData({
					city: displayValues
				})
			},
		})
	},
})