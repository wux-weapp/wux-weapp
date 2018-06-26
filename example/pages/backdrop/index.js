import { $wuxBackdrop } from '../../dist/index'

Page({
    data: {
        locks: 0,
    },
    onLoad() {
        this.$wuxBackdrop = $wuxBackdrop()
    },
    retain() {
        this.$wuxBackdrop.retain()
        this.setData({
            locks: this.$wuxBackdrop.backdropHolds
        })
    },
    release() {
        this.$wuxBackdrop.release()
        this.setData({
            locks: this.$wuxBackdrop.backdropHolds
        })
    }
})