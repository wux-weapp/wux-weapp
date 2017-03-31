import { $wuxBarcode } from '../../components/wux'

Page({
	data: {
		value: '', 
	},
	onLoad() {
		new $wuxBarcode('barcode', '9787115335500')
	},
	bindinput(e) {
		const value = e.detail.value

		if (value.length > 13) return {
			value: value.substr(0, 13), 
		}

		this.setData({
			value, 
		})

		new $wuxBarcode('barcode', value)
	},
})