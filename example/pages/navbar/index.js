import ad from '../index/ad'

ad({
    onClick(e) {
        console.log('onClick', e)
        if (e.detail.type === 'right') {
            wx.showModal({
                title: 'Thank you for your support!',
                showCancel: !1,
            })
        }
    },
})
