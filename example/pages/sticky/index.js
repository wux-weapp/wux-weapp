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
})
