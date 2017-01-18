const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxPickerCity = App.wux(this).$wuxPickerCity
	},
	onTapStart() {
		this.$wuxPickerCity.render('start', {
			title: '请选择出发点', 
			cancel: {
				text: '取消', 
				className: '', 
				bindtap: (value, values, displayValues) => { 
					console.log('用户点击取消')
				},
			},
			confirm: {
				text: '确定', 
				className: '', 
				bindtap: (value, values, displayValues) => { 
					console.log('用户点击确定')
					this.setData({
						start: displayValues
					})
				},
			},
			bindChange: (value, values, displayValues) => {
				console.log(value, values, displayValues)
			}
		})
	},
	onTapEnd() {
		this.$wuxPickerCity.render('end', {
			title: '请选择目的地', 
			bindChange: (value, values, displayValues) => {
				console.log(value, values, displayValues)
				this.setData({
					end: displayValues
				})
			}
		})
	}
})