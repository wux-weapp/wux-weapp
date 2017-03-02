const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxToast = App.Wux().$wuxToast
	},
	showToast() {
		this.$wuxToast.show({
			type: 'success',
			timer: 1500,
			color: '#fff',
			text: '已完成',
			success: () => console.log('已完成')
		})
	},
	showToastCancel() {
		this.$wuxToast.show({
			type: 'cancel',
			timer: 1500,
			color: '#fff',
			text: '取消操作',
			success: () => console.log('取消操作')
		})
	},
	showToastErr() {
		this.$wuxToast.show({
			type: 'forbidden',
			timer: 1500,
			color: '#fff',
			text: '禁止操作',
			success: () => console.log('禁止操作')
		})
	},
	showToastText() {
		this.$wuxToast.show({
			type: 'text',
			timer: 1500,
			color: '#fff',
			text: '文本提示',
			success: () => console.log('文本提示')
		})
	},
})