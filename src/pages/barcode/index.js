const App = getApp()

Page({
	data: {
		value: '', 
	},
	onLoad() {
		this.$wuxBarcode = App.Wux().$wuxBarcode

		this.$wuxBarcode('barcode', '9787115335500')
	},
	bindinput(e) {
		const value = e.detail.value

		if (value.length > 13) return {
			value: value.substr(0, 13), 
		}

		this.setData({
			value, 
		})

		this.$wuxBarcode('barcode', value)
	},
})