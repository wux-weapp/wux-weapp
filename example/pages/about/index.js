Page({
	data: {
		motto: 'Star me', 
		github: 'https://github.com/wux-weapp/wux-weapp', 
		userInfo: {}
	},
	onLoad() {
		wx.login({
			success: () => {
				wx.getUserInfo({
					success: (res) => {
						this.setData({
							userInfo: res.userInfo
						})
					}
				})
			}
		})
	}
})