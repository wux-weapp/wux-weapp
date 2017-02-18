import tools from '../tools/tools'
import countdown from 'countdown/index'

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
		this.__initDefaults()
		this.__initTools()
		this.__initComponents()
	}

	/**
	 * 默认参数
	 */
	__initDefaults() {
		const countDown = {}
		
		this.$scope.setData({
			[`$wux.countDown`]: countDown, 
		})
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
		this.__initCountDown()
    }

	/**
	 * CountDown组件
	 */
	__initCountDown() {
		const that = this
		const $scope = that.$scope

		that.$wuxCountDown = {
			/**
			 * 渲染CountDown组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.date 日期
			 * @param {Number} opts.refresh 刷新时间
			 * @param {Number} opts.offset 偏移量
			 * @param {Function} opts.onEnd 倒计时结束的回调函数
			 * @param {Function} opts.render 监听组件渲染的回调函数
			 */
			render(opts = {}) {
				return new countdown(opts)
			}, 
		}
	}
}

export default wux