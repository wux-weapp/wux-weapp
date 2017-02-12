import tools from '../tools/tools'
import qrjs from 'qr.js/index'

/**
 * wux组件
 * @param {Object} $scope 作用域对象
 */
class wux {
	constructor($scope) {
		Object.assign(this, {
			$scope, 
		})
		this.__init()
	}

	/**
	 * 初始化类方法
	 */
	__init() {
		this.__initTools()
		this.__initComponents()
	}

	/**
	 * 工具方法
	 */
	__initTools() {
    	this.tools = new tools
    }

    /**
     * 初始化所有组件
     */
    __initComponents() {
		this.__initQrcode()
    }

	/**
	 * 二维码
	 */
	__initQrcode() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxQrcode = {
			/**
			 * 默认参数
			 */
			defaults: {
				typeNumber: -1, 
				errorCorrectLevel: 2, 
				width: 200, 
				height: 200, 
				fgColor: 'black', 
				bgColor: 'white', 
			},
			/**
			 * 初始化qrcode组件
			 * @param {String} id 	唯一标识
			 * @param {String} data 文本内容
			 * @param {Object} opts 参数对象
			 * @param {Number} opts.typeNumber 类型
			 * @param {Number} opts.errorCorrectLevel 误差校正等级
			 * @param {Number} opts.width canvas宽度
			 * @param {Number} opts.height canvas高度
			 * @param {String} opts.fgColor 前景色
			 * @param {String} opts.bgColor 背景色
			 */
			init(id, data, opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const qrcode = qrjs(data, {
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
		}
	}
}

export default wux