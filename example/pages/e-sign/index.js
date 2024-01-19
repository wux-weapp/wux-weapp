import ad from '../index/ad'

ad({
    data: {
        width: 'auto',
    },
    onLoad() {},
    onSigning(e) {
        console.log('onSigning', e)
    },
    onClear(e) {
        console.log('onClear', e)
    },
    onSubmit(e) {
        console.log('onSubmit', e)
        const { base64Url } = e.detail
        if (base64Url) {
            wx.previewImage({
                urls: [base64Url],
            })
        }
    },
})
