Page({
	data: {
		content: '微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp',
	},
	onLoad() {
		setTimeout(() => {
			this.setData({
				content: 'Wux Weapp 是一套组件化、可复用、易扩展的微信小程序 UI 组件库。80+ 丰富的组件，能够满足移动端开发的基本需求。',
			})
			this.notice = this.selectComponent('#wux-notice-bar')
			this.notice.resetAnimation()
		}, 3000)
	},
    onClick() {
        wx.showModal({
            title: 'Thank you for your support!',
            showCancel: !1,
        })
    },
})