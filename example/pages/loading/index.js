import { $wuxLoading } from '../../dist/index'

import ad from '../index/ad'

ad({
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
