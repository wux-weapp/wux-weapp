let itemCount = 100
let items = [...new Array(itemCount)].map((v, i) => i)

Page({
	data: {
		disableScroll: false,
		height: 300,
		itemHeight: 50,
		itemBuffer: 30,
		scrollToIndex: 0,
		scrollWithAnimation: false,
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
	loadData(e) {
		if (itemCount >= 1000) return
		if (this.data.disableScroll) return
		this.setData({ disableScroll: true })
		wx.showLoading()
		setTimeout(() => {
			itemCount += 100
			items = [...new Array(itemCount)].map((v, i) => i)
			this.updated(items)
			this.setData({ disableScroll: false })
			wx.hideLoading()
		}, 3000)
		console.log('loadData', e.detail)
	},
	onChange(e) {
		const { startIndex, endIndex } = e.detail
		if (this.data.startIndex !== startIndex || this.data.endIndex !== endIndex) {
			this.setData(e.detail)
			console.log('onChange', e.detail)
		}
	},
	onScrollToLower(e) {
		this.loadData(e)
		console.log('onScrollToLower', e)
	},
	onInputBlur(e) {
		const { meta } = e.currentTarget.dataset
		this.setData({ [meta]: e.detail.value })
		console.log('onInputBlur', e)
	},
	onSwicth(e) {
		const { meta } = e.currentTarget.dataset
		this.setData({ [meta]: e.detail.value })
		console.log('onSwicth', e)
	},
})