Page({
    data: {
        current: [],
    },
    onLoad() {
        this.key = String(Math.floor(Math.random() * 3))
    },
    onChange(e) {
        console.log(e)

        if (e.detail.key.indexOf(this.key) !== -1) {
            return wx.showModal({
                title: 'No switching is allowed',
                showCancel: !1,
            })
        }

        this.setData({
            current: e.detail.key,
        })
    },
})