Page({
    data: {
        visible1: false,
        visible2: false,
    },
    open1() {
        this.setData({
            visible1: true,
        })
    },
    open2() {
        this.setData({
            visible2: true,
        })
    },
    close1() {
        this.setData({
            visible1: false,
        })
    },
    close2() {
        this.setData({
            visible2: false,
        })
    },
    onClose(key) {
        console.log('onClose')
        this.setData({
            [key]: false,
        })
    },
    onClose1() {
        this.onClose('visible1')
    },
    onClose2() {
        this.onClose('visible2')
    },
    onClosed1() {
        console.log('onClosed')
    },
})