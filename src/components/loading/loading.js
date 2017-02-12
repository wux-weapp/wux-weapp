import tools from '../tools/tools'

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
		const loading = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.loading`]: loading, 
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
		this.__initLoading()
    }
    
	/**
	 * loading组件
	 */
	__initLoading() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxLoading = {
			/**
			 * 默认参数
			 */
			defaults: {
				text: '数据加载中', 
			},
			/**
			 * 显示loading组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.text 提示文本
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)

				$scope.setData({
					[`$wux.loading`]: options, 
				})

				that.setVisible('loading')
			},
			/**
			 * 隐藏loading组件
			 */
			hide() {
				that.setHidden('loading')
			},
		}
	}

	/**
	 * 设置元素显示
	 */
	setVisible(key, className = 'weui-animate-fade-in') {
    	this.$scope.setData({
			[`$wux.${key}.visible`]: !0, 
			[`$wux.${key}.animateCss`]: className, 
		})
    }

    /**
	 * 设置元素隐藏
	 */
	setHidden(key, className = 'weui-animate-fade-out', timer = 300) {
    	this.$scope.setData({
			[`$wux.${key}.animateCss`]: className, 
		})

		setTimeout(() => {
			this.$scope.setData({
				[`$wux.${key}.visible`]: !1, 
			})
		}, timer)
    }
}

export default wux