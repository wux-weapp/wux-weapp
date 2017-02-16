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
		const actionSheet = {}
		
		this.$scope.setData({
			[`$wux.actionSheet`]: actionSheet, 
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
		this.__initActionSheet()
    }

	/**
	 * 上拉菜单组件
	 */
	__initActionSheet() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxActionSheet = {
			defaults: {
				className: undefined, 
	        	titleText: undefined, 
				buttons: [], 
				buttonClicked: function() {}, 
				cancelText: '取消', 
				cancel: function() {}, 
				// destructiveText: '删除', 
				// destructiveButtonClicked: function() {}, 
	        },
	        /**
			 * 显示上拉菜单组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.className 添加自定义类
			 * @param {String} opts.titleText 标题
			 * @param {Array} opts.buttons 按钮
			 * @param {Function} opts.buttonClicked 按钮点击事件
			 * @param {String} opts.cancelText 取消按钮的文本
			 * @param {Function} opts.cancel 取消按钮点击事件
			 * @param {String} opts.destructiveText 删除按钮的文本
			 * @param {Function} opts.destructiveButtonClicked 删除按钮点击事件
			 */
	        show(opts = {}) {
	        	const options = extend(clone(this.defaults), opts)
	        	const self = {}

	        	// 隐藏
	        	self.removeSheet = (callnack) => {
	        		if (self.removed) return !1
					self.removed = !0
	        		that.setHidden('actionSheet', ['weui-animate-slide-down', 'weui-animate-fade-out'])
	        		typeof callback === 'function' && callback(opts.buttons)
	        	}
	        	
	        	// 显示
	        	self.showSheet = () => {
	        		if (self.removed) return !1
	        		that.setVisible('actionSheet', ['weui-animate-slide-up', 'weui-animate-fade-in'])
	        	}

	        	// 按钮点击事件
	        	self.buttonClicked = (e) => {
	        		const index = e.currentTarget.dataset.index
	        		if (options.buttonClicked(index, options.buttons[index]) === true) {
						self.removeSheet()
					}
	        	}

	        	// 删除按钮点击事件
	        	self.destructiveButtonClicked = () => {
	        		if (options.destructiveButtonClicked() === true) {
	        			self.removeSheet()
	        		}
	        	}

	        	// 取消按钮点击事件
	        	self.cancel = () => self.removeSheet(options.cancel)

	        	// 渲染组件
				$scope.setData({
					[`$wux.actionSheet`]: options, 
					[`$wux.actionSheet.onButtonClicked`]: `actionSheetButtonClicked`, 
					[`$wux.actionSheet.onDestructiveButtonClicked`]: `actionSheetDestructiveButtonClicked`, 
					[`$wux.actionSheet.onCancel`]: `actionSheetCancel`, 
				})

				// 绑定tap事件
				$scope[`actionSheetButtonClicked`] = self.buttonClicked
				$scope[`actionSheetDestructiveButtonClicked`] = self.destructiveButtonClicked
				$scope[`actionSheetCancel`] = self.cancel

	        	self.showSheet()

	        	return self.cancel
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