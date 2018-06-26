import { $wuxGallery } from '../../dist/index'

Page({
    data: {
        urls: [
            'https://unsplash.it/200/200',
            'https://unsplash.it/300/300',
            'https://unsplash.it/400/400',
            'https://unsplash.it/600/600',
            'https://unsplash.it/800/800',
            'https://unsplash.it/900/900',
            'https://unsplash.it/1000/1000',
            'https://unsplash.it/1200/1200',
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
            showDelete: false,
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
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