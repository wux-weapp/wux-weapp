import tools from '../tools/tools'
import refresher from 'refresher/index'

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
		const refresher = {}
		
		this.$scope.setData({
			[`$wux.refresher`]: refresher, 
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
		this.__initRefresher()
    }

	/**
	 * Refresher组件
	 */
	__initRefresher() {
		const that = this
		const $scope = that.$scope

		that.$wuxRefresher = {
			/**
			 * 渲染Refresher组件
			 * @param {Object} opts 参数对象
			 */
			render(opts = {}) {
				return new refresher($scope, opts)
			}, 
		}
	}
}

export default wux