const App = getApp()

Page({
	data: {
		urls: [
			'https://unsplash.it/200/200', 
			'https://unsplash.it/300/300', 
			'https://unsplash.it/400/400', 
			'https://unsplash.it/600/600', 
			'https://unsplash.it/800/800', 
			'https://unsplash.it/900/900', 
			'https://unsplash.it/1000/1000', 
			'https://unsplash.it/1200/1200', 
		],
	},
	onLoad() {
		this.$wuxGallery = App.Wux().$wuxGallery
	},
	showGallery(e) {
		const that = this
		const dataset = e.currentTarget.dataset
		const current = dataset.current
		const urls = this.data.urls

		this.$wuxGallery.show({
			current: current, 
			urls: urls, 
			delete: (current, urls) => {
				urls.splice(current, 1)
				that.setData({
					urls: urls, 
				})
				return !0
			},
			cancel: () => console.log('Close gallery')
		})
	},
	previewImage(e) {
		const dataset = e.currentTarget.dataset
		const current = dataset.current
		const urls = this.data.urls

		wx.previewImage({
			current: current, 
			urls: urls, 
		})
	},
})