Page({
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
        }
    },
    onLoad() {},
    bindinput(e) {
        this.setData({
            number: e.detail.value,
        })
    },
})