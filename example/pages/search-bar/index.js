Page({
	data: {
		value: '',
	},
	onChange(e) {
		console.log('onChange', e)
		this.setData({
			value: e.detail.value,
		})
	},
	onFocus(e) {
		console.log('onFocus', e)
	},
	onBlur(e) {
		console.log('onBlur', e)
	},
	onConfirm(e) {
		console.log('onConfirm', e)
	},
	onClear(e) {
		console.log('onClear', e)
		this.setData({
			value: '',
		})
	},
	onCancel(e) {
		console.log('onCancel', e)
	},
})