const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxLoading = App.wux(this).$wuxLoading
	},
	showLoading() {
		this.$wuxLoading.show({
			text: '数据加载中',
		})

		setTimeout(() => {
            this.$wuxLoading.hide()
        }, 1500)
	},
})