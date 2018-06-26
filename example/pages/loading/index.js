import { $wuxLoading } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showLoading() {
        this.$wuxLoading = $wuxLoading()
        this.$wuxLoading.show({
            text: '数据加载中',
        })

        setTimeout(() => {
            this.$wuxLoading.hide()
        }, 1500)
    },
})