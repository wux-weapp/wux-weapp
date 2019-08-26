let height = wx.getSystemInfoSync().windowHeight
let itemCount = 1000
let items = [...new Array(itemCount)].map((v, i) => i)

Page({
	data: {
		disableScroll: false,
		height,
	},
	onLoad() {
		this.updated(items)
	},
	updated(items) {
		const startTime = Date.now()
		this.virtualList = this.virtualList || this.selectComponent('#wux-virtual-list')
		this.virtualList.render(items, () => {
			const diffTime = Date.now() - startTime
			console.log(`onSuccess - render time: ${diffTime}ms`)
		})
	},
	loadData() {
		if (itemCount >= 10000) return
		if (this.data.disableScroll) return
		this.setData({ disableScroll: true })
		wx.showLoading()
		setTimeout(() => {
			itemCount += 1000
			items = [...new Array(itemCount)].map((v, i) => i)
			this.updated(items)
			this.setData({ disableScroll: false })
			wx.hideLoading()
			wx.stopPullDownRefresh()
		}, 3000)
		console.log('loadData')
	},
	onChange(e) {
		const { startIndex, endIndex } = e.detail
		if (this.data.startIndex !== startIndex || this.data.endIndex !== endIndex) {
			this.setData(e.detail)
			console.log('onChange', e.detail)
		}
	},
	onPageScroll(e) {
		// 当页面滚动时调用组件 scrollHandler 方法
		this.virtualList.scrollHandler({ detail: e })
		// console.log('onPageScroll', e)
	},
	onReachBottom() {
		this.loadData()
		console.log('onReachBottom')
	},
	onPullDownRefresh() {
		itemCount = 0
		this.loadData()
		console.log('onPullDownRefresh')
	},
})