const App = getApp()

Page({
	data: {},
	onLoad() {
		const that = this
		that.$wuxCountDown = App.Wux().$wuxCountDown

		that.c1 = that.$wuxCountDown({
			date: 'June 7, 2087 15:03:25', 
			render(date) {
				const years = this.leadingZeros(date.years, 4)  + ' 年 '
				const days = this.leadingZeros(date.days, 3)  + ' 天 '
				const hours = this.leadingZeros(date.hours, 2)  + ' 时 '
				const min = this.leadingZeros(date.min, 2)  + ' 分 '
				const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '

				that.setData({
					c1: years + days + hours + min + sec, 
				})
			}, 
		})

		that.c3 = that.$wuxCountDown({
			date: +(new Date) + 60000 * 20, 
			render(date) {
				const min = this.leadingZeros(date.min, 2)  + ' 分 '
				const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '

				that.setData({
					c3: min + sec, 
				})
			},
		})
	},
	vcode() {
		const that = this
		if (that.c2 && that.c2.interval) return !1
		that.c2 = that.$wuxCountDown({
			date: +(new Date) + 60000, 
			onEnd() {
				that.setData({
					c2: '重新获取验证码', 
				})
			},
			render(date) {
				const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '
				date.sec !== 0 && that.setData({
					c2: sec, 
				})
			},
		})
	},
	stop() {
		this.c3.stop()
	},
	start() {
		this.c3.start()
	},
	update() {
		this.c3.update(+(new Date) + 60000 * 30)
	},
})