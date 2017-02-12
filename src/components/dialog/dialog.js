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
		const dialog = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.dialog`]: dialog, 
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
		this.__initDialog()
    }

	/**
	 * 对话框组件
	 */
	__initDialog() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxDialog = {
			/**
			 * 默认参数
			 */
			defaults: {
				showCancel: !0, 
				title: '', 
				content: '', 
				confirmText: '确定', 
				cancelText: '取消', 
				confirm: function() {}, 
				cancel: function() {}, 
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 * @param {Boolean} opts.showCancel 是否显示取消按钮
			 * @param {String} opts.title 提示标题
			 * @param {String} opts.content 提示文本
			 * @param {String} opts.confirmText 确定按钮的文字
			 * @param {String} opts.cancelText 取消按钮的文字
			 * @param {Function} opts.confirm 点击确定按钮的回调函数
			 * @param {Function} opts.cancel 点击按钮按钮的回调函数
			 */
			open(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const hideDialog = (cb) => {
					that.setHidden('dialog')
					typeof cb === 'function' && cb()
				}

				// 渲染组件
				$scope.setData({
					[`$wux.dialog`]: options, 
					[`$wux.dialog.dialogConfirm`]: `dialogConfirm`, 
					[`$wux.dialog.dialogCancel`]: `dialogCancel`, 
				})

				// 绑定tap事件
				$scope.dialogConfirm = () => hideDialog(options.confirm)
				$scope.dialogCancel = () => hideDialog(options.cancel)

				that.setVisible('dialog')

				return $scope.dialogCancel
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