import ad from '../index/ad'

ad({
    data: {
        current: 1,
        swiperCurrent: 0,
    },
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        this.setData({
            swiperCurrent: e.detail.current,
        })
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.current,
        })
    },
    onPrev(e) {
        console.log('onPrev', e)
    },
    onNext(e) {
        console.log('onNext', e)
    },
})
