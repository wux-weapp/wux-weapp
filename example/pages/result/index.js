import ad from '../index/ad'

ad({
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
