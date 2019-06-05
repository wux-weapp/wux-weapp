Page({
    data: {
        scrollTop: 0,
    },
    onPageScroll(e){
        console.log('onPageScroll', e.scrollTop)
        this.setData({
            scrollTop: e.scrollTop,
        })
    },
    onLoad() {
        getApp().checkAudio()
    },
    onStick(e) {
        console.log('onStick', e.detail)
    },
    onUnStick(e) {
        console.log('onUnStick', e.detail)
    },
})
