Page({
    data: {
        buttons: [{
                type: 'balanced',
                block: true,
                text: '确定',
            },
            {
                type: 'light',
                block: true,
                text: '返回',
            },
        ],
    },
    onClick(e) {
        console.log(e)
        const { index } = e.detail

        index === 0 && wx.showModal({
            title: 'Thank you for your support!',
            showCancel: !1,
        })

        index === 1 && wx.navigateBack()
    },
})