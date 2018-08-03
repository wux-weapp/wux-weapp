Page({
    onSuccess() {
        wx.navigateTo({
            url: '../../pages/result/success',
        })
    },
    onError() {
        wx.navigateTo({
            url: '../../pages/result/error',
        })
    },
})