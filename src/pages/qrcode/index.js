import { $wuxQrcode } from '../../components/wux'

Page({
	data: {
		value: '', 
	},
	onLoad() {
		$wuxQrcode.init('qrcode', 'wux')
	},
	bindinput(e) {
		const value = e.detail.value

		this.setData({
			value, 
		})

		$wuxQrcode.init('qrcode', value)
	},
})