import ad from '../index/ad'

ad({
    data: {
        current: 1,
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
