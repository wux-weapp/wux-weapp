const App = getApp()

Page({
	data: {
		locks: 0, 
	},
	onLoad() {
		this.$wuxBackdrop = App.wux(this).$wuxBackdrop
	},
	retain() {
		this.$wuxBackdrop.retain()
		this.setData({
			locks: this.$wuxBackdrop.backdropHolds
		})
	},
	release() {
		this.$wuxBackdrop.release()
		this.setData({
			locks: this.$wuxBackdrop.backdropHolds
		})
	}
})