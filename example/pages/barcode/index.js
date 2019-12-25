import ad from '../index/ad'

ad({
    data: {
        number: '9787115335524',
        options: {
            // number: true,
            // prefix: true,
            // color: 'black',
            // debug: false,
            onValid() { console.log('onValid') },
            onInvalid() { console.log('onInvalid') },
            onSuccess() { console.log('onSuccess') },
            onError() { console.log('onError') },
        },
    },
    onChange(e) {
        this.setData({
            number: e.detail.value,
        })
    },
})
