import ad from '../index/ad'

ad({
    onFullscreen() {
        wx.navigateTo({
            url: '../../pages/water-mark/fullscreen',
        })
    },
    onHalfscreen() {
        wx.navigateTo({
            url: '../../pages/water-mark/halfscreen',
        })
    },
})
