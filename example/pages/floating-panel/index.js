import ad from '../index/ad'

const windowHeight = wx.getSystemInfoSync().windowHeight
const locations = [{
    name: '北京',
    geo: [116.46, 39.92],
}, {
    name: '上海',
    geo: [121.48, 31.22],
}, {
    name: '广州',
    geo: [113.23, 23.16],
}, {
    name: '深圳',
    geo: [114.07, 22.62],
}]

ad({
    data: {
        geo: locations[0].geo,
        locations,
        defaultAnchors: [100, windowHeight * .5, windowHeight * .8],
    },
    onHeightChange(e) {
        console.log('onHeightChange', e.detail)
        const { height, maxHeight } = e.detail
        const ratio = height / maxHeight
        this.setData({
            height: '100%',
            backgroundImage: `linear-gradient(rgba(124, 24, 126, ${ratio}), rgba(203, 98, 117, ${ratio}))`,
        })
    },
    setHeight() {
        const floatingPanelRef = this.selectComponent('#wux-floating-panel')
        floatingPanelRef.setHeight(200, { immediate: true })
    },
    onLocation(e) {
        console.log('onLocation', e.target.dataset)
        const { geo } = e.target.dataset
        this.setData({
            geo,
        })
    },
})
