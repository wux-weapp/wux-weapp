Page({
	data: {
		percent: 50,
	},
	add() {
		let percent = this.data.percent + 10

		if (this.data.percent >= 100) {
			percent = 0
		}

		this.setData({
			percent,
		})
	},
})