import { $wuxLoading } from '../../components/wux'

Page({
	data: {},
	onLoad() {},
	showLoading() {
		$wuxLoading.show({
			text: '数据加载中',
		})

		setTimeout(() => {
            $wuxLoading.hide()
        }, 1500)
	},
})