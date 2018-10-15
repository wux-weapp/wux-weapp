Page({
	data: {
		value: [0],
	},
	onChange(e) {
		console.log('onChange', e.detail.value)
		this.setData({ value: e.detail.value })
	},
	afterChange(e) {
		console.log('afterChange', e.detail.value)
		this.setData({ value: e.detail.value })
	},
})