Page({
	data: {
		motto: 'Star me',
		github: 'https://github.com/wux-weapp/wux-weapp',
        userInfo: {
            avatarUrl: 'https://avatars3.githubusercontent.com/u/14972920?s=460&v=4',
            nickname: 'Skyvow',
            desc: '我是一个小胖子，没事就摸肚子',
            url: 'https://github.com/skyvow',
        },
	},
	clipboard(e) {
        wx.setClipboardData({
            data: e.currentTarget.dataset.clipboard,
        })
    },
})
