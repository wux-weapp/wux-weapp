import { $wuxBackdrop } from '../../components/wux'

Page({
	data: {
		locks: 0, 
	},
	onLoad() {
		this.$wuxBackdrop = $wuxBackdrop.init()
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