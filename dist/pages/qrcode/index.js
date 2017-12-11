import { $wuxQrcode } from '../../components/wux'

Page({
	data: {
		value: '', 
	},
	onLoad() {
		this.renderQrcode('qrcode', 'https://github.com/skyvow/wux')
	},
	bindinput(e) {
		const value = e.detail.value

		this.setData({
			value, 
		})

		this.renderQrcode('qrcode', value)
	},
	previewImage() {
		wx.canvasToTempFilePath({
			canvasId: 'qrcode', 
			success: res => {
				wx.previewImage({
					urls: [res.tempFilePath]
				})
			}
		})
	},
	randomColor() {
		const colorStr = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
		const length = colorStr.length
		const prefixStr = `000000`.substring(0, 6 - colorStr.length)
		return `#${prefixStr}${colorStr}`
	},
	renderQrcode(canvasId, value) {
		$wuxQrcode.init(canvasId, value, {
			fgColor: this.randomColor()
		})
	},
})