const App = getApp()

Page({
	data: {
		$wux: {
			aaa: 1
		}
	},
	onLoad() {
		this.$wuxDialog = App.wux(this).$wuxDialog
	},
	openConfirm() {
		const hideDialog = this.$wuxDialog.open({
			title: '弹窗标题',
			content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			confirm: () => console.log('confirm'),
			cancel: () => console.log('cancel'),
		})

		// setTimeout(hideDialog, 3000)
	},
	openAlert() {
		this.$wuxDialog.open({
			showCancel: !1,
			title: '弹窗标题',
			content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			confirm: () => console.log('confirm'),
		})
	}
})