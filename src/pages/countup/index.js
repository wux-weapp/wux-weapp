import { $wuxCountUp } from '../../components/wux'

Page({
	data: {},
	onLoad() {
		const that = this

		that.c1 = new $wuxCountUp(1, 1024, 0, 2, {
			printValue(value) {
				that.setData({
					c1: value, 
				})
			}
		})

		that.c2 = new $wuxCountUp(0, 88.88, 2, 2, {
			printValue(value) {
				that.setData({
					c2: value, 
				})
			}
		})

		that.c3 = new $wuxCountUp(0, 520, 0, 2, {
			printValue(value) {
				that.setData({
					c3: value, 
				})
			}
		})
		
		that.c1.start()
		that.c2.start()
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