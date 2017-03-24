Page({
	data: {
		type: `grid`, 
		components: [
			{
				title: 'ActionSheet', 
				remark: '上拉菜单', 
				url: '/pages/actionsheet/index', 
				icon: '../../assets/images/iconfont-actionsheet.png', 
			},
			{
				title: 'Backdrop', 
				remark: '背景幕', 
				url: '/pages/backdrop/index', 
				icon: '../../assets/images/iconfont-backdrop.png', 
			},
			{
				title: 'Barcode', 
				remark: '条形码', 
				url: '/pages/barcode/index', 
				icon: '../../assets/images/iconfont-barcode.png', 
			},
			{
				title: 'CountDown', 
				remark: '倒计时', 
				url: '/pages/countdown/index', 
				icon: '../../assets/images/iconfont-countdown.png', 
			},
			{
				title: 'CountUp', 
				remark: '计数器', 
				url: '/pages/countup/index', 
				icon: '../../assets/images/iconfont-countup.png', 
			},
			{
				title: 'Dialog', 
				remark: '对话框', 
				url: '/pages/dialog/index', 
				icon: '../../assets/images/iconfont-dialog.png', 
			},
			{
				title: 'Gallery', 
				remark: '画廊', 
				url: '/pages/gallery/index', 
				icon: '../../assets/images/iconfont-gallery.png', 
			},
			{
				title: 'Loading', 
				remark: '指示器', 
				url: '/pages/loading/index', 
				icon: '../../assets/images/iconfont-loading.png', 
			},
			{
				title: 'Picker', 
				remark: '选择器', 
				url: '/pages/picker/index', 
				icon: '../../assets/images/iconfont-picker.png', 
			},
			{
				title: 'Prompt', 
				remark: '提示消息', 
				url: '/pages/prompt/index', 
				icon: '../../assets/images/iconfont-prompt.png', 
			},
			{
				title: 'Qrcode', 
				remark: '二维码', 
				url: '/pages/qrcode/index', 
				icon: '../../assets/images/iconfont-qrcode.png', 
			},
			{
				title: 'Rater', 
				remark: '评分', 
				url: '/pages/rater/index', 
				icon: '../../assets/images/iconfont-rater.png', 
			},
			{
				title: 'Refresher', 
				remark: '下拉刷新', 
				url: '/pages/refresher/index', 
				icon: '../../assets/images/iconfont-refresher.png', 
			},
			{
				title: 'Seats', 
				remark: '座位图', 
				url: '/pages/seats/index', 
				icon: '../../assets/images/iconfont-seats.png', 
			},
			{
				title: 'Toast', 
				remark: '提示框', 
				url: '/pages/toast/index', 
				icon: '../../assets/images/iconfont-toast.png', 
			},
			{
				title: 'Toptips', 
				remark: '顶部提示', 
				url: '/pages/toptips/index', 
				icon: '../../assets/images/iconfont-toptips.png', 
			},
			{
				title: 'Xnumber', 
				remark: '数字输入框', 
				url: '/pages/xnumber/index', 
				icon: '../../assets/images/iconfont-xnumber.png', 
			},
		],
	},
	modSwitch(e) {
		this.setData({
			type: e.currentTarget.dataset.type, 
		})
	},
})