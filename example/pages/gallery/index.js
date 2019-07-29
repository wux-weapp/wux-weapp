import { $wuxGallery } from '../../dist/index'

Page({
    data: {
        urls: [
            'http://cdn.skyvow.cn/logo.png',
            'http://cdn.skyvow.cn/logo.png',
            'http://cdn.skyvow.cn/logo.png',
            'http://cdn.skyvow.cn/logo.png',
        ],
    },
    onLoad() {},
    showGallery(e) {
        const { current } = e.currentTarget.dataset
        const { urls } = this.data

        this.$wuxGallery = $wuxGallery()

        this.$wuxGallery.show({
            current,
            urls,
            [`delete`]: (current, urls) => {
                urls.splice(current, 1)
                this.setData({
                    urls,
                })
                return true
            },
            cancel() {
                console.log('Close gallery')
            },
            onTap(current, urls) {
                console.log(current, urls)
                return true
            },
            onChange(e) {
                console.log(e)
            },
        })
    },
    showGallery2(e) {
        const { current } = e.currentTarget.dataset
        const { urls } = this.data

        $wuxGallery().show({
            current,
            urls: urls.map((n) => ({ image: n, remark: n })),
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
            icon: 'http://cdn.skyvow.cn/logo.png',
            [`delete`]: (current, urls) => {
                console.log('onIconClick')
                return true
            },
        })
    },
    previewImage(e) {
        const { current } = e.currentTarget.dataset
        const { urls } = this.data

        wx.previewImage({
            current,
            urls,
        })
    },
})