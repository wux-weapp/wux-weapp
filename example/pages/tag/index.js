Page({
	data: {
		visible: true,
	},
	onClose(e) {
		console.log('onClose', e)
	},
	onChange(e) {
		console.log('onChange', e)
		if (!e.detail.value) {
			wx.showModal({
				title: 'Sure to delete?',
				success: (res) => {
					if (res.confirm) {
						this.setData({
							visible: e.detail.value,
						})
					}
				},
			})
		}
	},
	onToggle() {
		this.setData({
			visible: !this.data.visible,
		})
	},
})