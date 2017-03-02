const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxActionSheet = App.Wux().$wuxActionSheet
	},
	showActionSheet1() {
		wx.showActionSheet({
			itemList: ['实例菜单', '实例菜单']
		})
	},
	showActionSheet2() {
		this.$wuxActionSheet.show({
			titleText: '自定义操作',
			buttons: [
				{ 
					text: 'Go Dialog' 
				},
				{ 
					text: 'Go Toast' 
				},
			],
			buttonClicked(index, item) {
				index === 0 && wx.navigateTo({
					url: '/pages/dialog/index'
				})

				index === 1 && wx.navigateTo({
					url: '/pages/toast/index'
				})
				
				return true
			},
			cancelText: '取消',
			cancel() {},
			destructiveText: '删除',
			destructiveButtonClicked() {},
		})
	},
	showActionSheet3() {
		if (this.timeout) clearTimeout(this.timeout)

		const hideSheet = this.$wuxActionSheet.show({
			titleText: '三秒后自动关闭',
			buttons: [
				{ 
					text: '实例菜单' 
				},
				{ 
					text: '实例菜单' 
				},
			],
			buttonClicked(index, item) {
				return true
			},
		})

		this.timeout = setTimeout(hideSheet, 3000)
	},
})