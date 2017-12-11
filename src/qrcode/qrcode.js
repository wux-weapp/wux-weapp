import qrjs from 'qr.js/index'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			typeNumber: -1, 
			errorCorrectLevel: 2, 
			width: 200, 
			height: 200, 
			fgColor: `black`, 
			bgColor: `white`, 
		}
	},
	/**
	 * 初始化qrcode组件
	 * @param {String} id 	唯一标识
	 * @param {String} data 文本内容
	 * @param {Object} opts 配置项
	 * @param {Number} opts.typeNumber 类型
	 * @param {Number} opts.errorCorrectLevel 误差校正等级
	 * @param {Number} opts.width canvas宽度
	 * @param {Number} opts.height canvas高度
	 * @param {String} opts.fgColor 前景色
	 * @param {String} opts.bgColor 背景色
	 */
	init(id, data, opts = {}) {
		const options = Object.assign({}, this.setDefaults(), opts)
		const qrcode = qrjs(this.utf16to8(data), {
			typeNumber: options.typeNumber, 
			errorCorrectLevel: options.errorCorrectLevel, 
		})
		const ctx = wx.createCanvasContext(id)
		const cells = qrcode.modules
		const tileW = options.width / cells.length
		const tileH = options.height / cells.length

		ctx.scale(1, 1)

		cells.forEach((row, rdx) => {
			row.forEach((cell, cdx) => {
				ctx.setFillStyle(cell ? options.fgColor : options.bgColor)
				const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
				const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
				ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
			})
		})

		ctx.draw()
	},
	/**
	 * 字符串转换成 UTF-8
	 * @param {String} str 文本内容
	 */
	utf16to8(str) {
		const len = str.length
		let out = ``

		for(let i = 0; i < len; i++) {
			const c = str.charCodeAt(i)

			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i)
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
			}
		}

		return out
	},
}