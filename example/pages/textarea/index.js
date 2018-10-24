const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
	onChange(e) {
		console.log('onChange', e)
		this.setData({
			error: isTel(e.detail.value),
			value: e.detail.value,
		})
	},
	onFocus(e) {
		this.setData({
			error: isTel(e.detail.value),
		})
		console.log('onFocus', e)
	},
	onBlur(e) {
		this.setData({
			error: isTel(e.detail.value),
		})
		console.log('onBlur', e)
	},
	onConfirm(e) {
		console.log('onConfirm', e)
	},
	onClear(e) {
		console.log('onClear', e)
		this.setData({
			error: true,
			value: '',
		})
	},
	onError() {
		wx.showModal({
			title: 'Please enter 11 digits',
			showCancel: !1,
		})
	},
})