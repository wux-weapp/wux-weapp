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
		this.$wux = {
			toptips: {
				visible: !1, 
			},
		}
		
		this.$scope.setData({
			[`$wux`]: this.$wux
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
		this.__initToptips()
    }

	/**
	 * 顶部提示
	 */
	__initToptips() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		let _toptips = null

		that.$wuxToptips = {
			/**
			 * 默认参数
			 */
			defaults: {
				text: '', 
				timer: 3000, 
				className: '', 
				success: function() {}, 
			},
			/**
			 * 显示toptips组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.text 报错文本
			 * @param {Number} opts.timer 多少毫秒后消失
			 * @param {String} opts.className 添加自定义类
			 * @param {Function} opts.success 消失后的回调函数
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const hide = () => {
					that.setHidden('toptips')
					typeof options.success === 'function' && options.success()
				}

				if(_toptips){
					clearTimeout(_toptips.timeout)
					_toptips = null
				}

				_toptips = {
					hide, 
				}

				_toptips.timeout = setTimeout(hide, options.timer)

				$scope.setData({
					[`$wux.toptips`]: options, 
				})

				that.setVisible('toptips')

				return _toptips.hide
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