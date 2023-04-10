import { $wuxBackdrop } from '../../dist/index'

import ad from '../index/ad'

ad({
    data: {
        visible1: false,
        visible2: false,
        visible3: false,
        locks: 0,
    },
    setVisible1() {
        this.setData({
            visible1: true,
        })
    },
    onMaskClick1() {
        this.setData({
            visible1: false,
        })
    },
    setVisible2() {
        this.setData({
            visible2: true,
        })
    },
    onMaskClick2() {
        this.setData({
            visible2: false,
        })
    },
    setVisible3() {
        this.setData({
            visible3: true,
        })
    },
    onMaskClick3() {
        this.setData({
            visible3: false,
        })
    },
    onShowed3() {
        console.log('onShowed3')
    },
    onClosed3() {
        console.log('onClosed3')
    },
    onLoad() {
        this.$wuxBackdrop = $wuxBackdrop()
    },
    retain() {
        this.$wuxBackdrop.retain()
        this.setData({
            zIndex: 1010,
            locks: this.$wuxBackdrop.backdropHolds,
        })
    },
    release() {
        this.$wuxBackdrop.release()
        this.setData({
            zIndex: this.$wuxBackdrop.backdropHolds ? 1010 : 'unset',
            locks: this.$wuxBackdrop.backdropHolds,
        })
    },
})
