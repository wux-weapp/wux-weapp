import ad from '../index/ad'

ad({
    data: {
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
    onPreview(e) {
        wx.previewImage({
            urls: [e.currentTarget.dataset.url],
        })
    },
    onShareAppMessage() {
        return {
            title: '一套组件化、可复用、易扩展的微信小程序 UI 组件库',
            path: '/pages/index/index',
            imageUrl: 'http://cdn.skyvow.cn/logo.png',
        }
    },
})
