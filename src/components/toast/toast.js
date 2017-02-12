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
		const toast = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.toast`]: toast, 
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
		this.__initToast()
    }

	/**
	 * 弹出式提示组件
	 */
	__initToast() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope
		const TOAST_TYPES = [
			{
				type: 'success',
				icon: 'success_no_circle',
				className: 'weui-toast-success',
			},
			{
				type: 'cancel',
				icon: 'cancel',
				className: 'weui-toast-cancel',
			},
			{
				type: 'forbidden',
				icon: 'warn',
				className: 'weui-toast-forbidden',
			},
			{
				type: 'text',
				icon: '',
				className: 'weui-toast-text',
			},
		]

		that.$wuxToast = {
			/**
			 * 默认参数
			 */
			defaults: {
				type: 'success', 
				timer: 1500, 
				color: '#fff', 
				text: '已完成', 
				success: function() {}, 
			},
			/**
			 * 显示toast组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.type 提示类型
			 * @param {Number} opts.timer 提示延迟时间
			 * @param {String} opts.color 图标颜色
			 * @param {String} opts.text 提示文本
			 * @param {Function} opts.success 关闭后的回调函数
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const remove = (cb) => {
					setTimeout(() => {
						that.setHidden('toast')
						typeof cb === 'function' && cb()
					}, options.timer)
				}

				// 判断提示类型，显示对应的图标
				TOAST_TYPES.forEach((value, key) => {
    				if (value.type === opts.type) {
    					options.type = value.icon
    					options.className = value.className
    				}
    			})

				$scope.setData({
					[`$wux.toast`]: options, 
				})

				that.setVisible('toast')

				remove(options.success)
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