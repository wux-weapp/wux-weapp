import ad from '../index/ad'

ad({
    data: {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
        visible5: false,
        visible6: false,
        visible7: false,
        visible8: false,
        visible9: false,
    },
    onOpen(e) {
        const { key } = e.currentTarget.dataset
        this.setData({
            [`visible${key}`]: true,
        })
        console.log('onOpen', `visible${key}`)
    },
    onClose(e) {
        const { key } = e.currentTarget.dataset
        this.setData({
            [`visible${key}`]: false,
        })
        console.log('onClose', `visible${key}`)
    },
    onShowed() {
        console.log('onShowed')
    },
    onClosed() {
        console.log('onClosed')
    },
})
