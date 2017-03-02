const App = getApp()

Page({
	data: {
		value: '', 
	},
	onLoad() {
		this.$wuxQrcode = App.Wux().$wuxQrcode

		this.$wuxQrcode.init('qrcode', 'wux')
	},
	bindinput(e) {
		const value = e.detail.value

		this.setData({
			value, 
		})

		this.$wuxQrcode.init('qrcode', value)
	},
})