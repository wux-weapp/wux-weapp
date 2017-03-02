const App = getApp()

Page({
	data: {
		items: [
			{
				title: new Date, 
				content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
			},
			{
				title: new Date, 
				content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
			}
		]
	},
	onLoad() {
		this.refresher = App.Wux().$wuxRefresher({
			onPulling() {
				console.log('onPulling')
			},
			onRefresh() {
				console.log('onRefresh')
				setTimeout(() => {
					const items = this.scope.data.items

					items.unshift({
						title: new Date, 
						content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
					})

					this.scope.setData({
						items: items, 
					})
					
					this.events.emit(`scroll.refreshComplete`)
				}, 2000)
			}
		})
		console.log(this.refresher)
	},
	touchstart(e) {
		this.refresher.touchstart(e)
	}, 
	touchmove(e) {
		this.refresher.touchmove(e)
	}, 
	touchend(e) {
		this.refresher.touchend(e)
	}, 
})