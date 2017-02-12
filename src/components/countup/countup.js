import tools from '../tools/tools'
import countup from 'countup/index'

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
		const countUp = {}
		
		this.$scope.setData({
			[`$wux.countUp`]: countUp, 
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
		this.__initCountUp()
    }

	/**
	 * Countup组件
	 */
	__initCountUp() {
		const that = this
		const $scope = that.$scope

		that.$wuxCountUp = {
			/**
			 * 渲染Countup组件
			 * @param {String} id id
			 * @param {Number} startVal the value you want to begin at
			 * @param {Number} endVal the value you want to arrive at
			 * @param {Number} decimals number of decimal places, default 0
			 * @param {Number} duration duration of animation in seconds, default 2
			 * @param {Object} options optional object of options (see below)
			 * @param {Boolean} options.useEasing toggle easing
			 * @param {Boolean} options.useGrouping 1,000,000 vs 1000000
			 * @param {String} options.separator character to use as a separator
			 * @param {String} options.decimal character to use as a decimal
			 * @param {Function} options.easingFn optional custom easing closure function, default is Robert Penner's easeOutExpo
			 * @param {Function} options.formattingFn optional custom formatting function, default is self.formatNumber below
			 * @param {String} options.prefix prefix
			 * @param {String} options.suffix suffix
			 */
			render(id, startVal, endVal, decimals, duration, options) {
				return new countup($scope, id, startVal, endVal, decimals, duration, options)
			}, 
		}
	}
}

export default wux