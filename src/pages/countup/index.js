const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxCountUp = App.wux(this).$wuxCountUp

		this.c1 = this.$wuxCountUp.render('c1', 1, 1024)
		this.c2 = this.$wuxCountUp.render('c2', 0, 88.88, 2)
		this.c3 = this.$wuxCountUp.render('c3', 0, 520)
		
		this.c1.start()
		this.c2.start()
	},
	start() {
		this.c3.start(() => {
			wx.showToast({
				title: '已完成', 
			})
		})
	},
	reset() {
		this.c3.reset()
	},
	update() {
		this.c3.update(1314)
	},
	pauseResume() {
		this.c3.pauseResume()
	},
})