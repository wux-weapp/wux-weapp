Page({
    data: {
        current: 1,
    },
	onChange(e) {
		console.log('onChange', e)
        this.setData({
            current: e.detail.current,
        })
	},
})
