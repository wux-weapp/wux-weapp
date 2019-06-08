Page({
    data: {
        visible1: false,
        visible2: false,
    },
    onOpen1() {
        this.setData({
            visible1: true,
        })
    },
    onOpen2() {
        this.setData({
            visible2: true,
        })
    },
    onClose1() {
        this.setData({
            visible1: false,
        })
    },
    onClose2() {
        this.setData({
            visible2: false,
        })
    },
})
