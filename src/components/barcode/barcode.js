import tools from '../tools/tools'
import ean13 from 'ean13/index'

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
		this.__initBarcode()
    }

	/**
	 * 条形码
	 */
	__initBarcode() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxBarcode = {
			/**
			 * 默认参数
			 */
			defaults: {
				width: 200, 
				height: 100, 
				number: true, 
				prefix: true, 
				color: 'black', 
				debug: false, 
				onValid: function() {}, 
				onInvalid: function() {}, 
				onSuccess: function() {}, 
				onError: function() {}, 
			},
			/**
			 * 初始化barcode组件
			 * @param {String} id 	唯一标识
			 * @param {Number} number 文本内容
			 * @param {Object} opts 参数对象
			 */
			init(id, number, opts = {}) {
				return new ean13(id, number, extend(clone(this.defaults), opts))
			},
		}
	}
}

export default wux