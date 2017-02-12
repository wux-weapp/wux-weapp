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
		const picker = {}
		
		this.$scope.setData({
			[`$wux.picker`]: picker, 
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
		this.__initPicker()
    }

	/**
	 * 选择器
	 */
	__initPicker() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		// 更新参数
		const updateParam = (items, value) => {
			const params = {
				value: value, 
				values: [], 
			}

			items.forEach((n, i) => {
				params.values.push(n[value[i]])
			})

			return params
		}

		// 判断二维数组
		const isMultiFn = (items) => {
			for(let i = 0, len = items.length; i < len; i++) {
				if(items[i] instanceof Array) return !0
			}
			return !1
		}

		that.$wuxPicker = {
			/**
			 * 默认参数
			 */
			defaults: {
				title: '请选择', 
				items: [], 
				cancel: {
					text: '取消', 
					className: '', 
					bindtap: function(){ 
						return !1
					},
				},
				confirm: {
					text: '确定', 
					className: '', 
					bindtap: function(){ 
						return !0
					},
				},
				bindChange: function() {}
			},
			/**
			 * 默认数据
			 */
			defaultValue(items) {
				let value = [], len = items.length, i = 0
				for(i = 0; i < len; i ++) {
					value.push(0)
				}
				return value
			},
			/**
			 * 缓存上一次滑动的位置
			 */
			temp: {},
			/**
			 * 渲染选择器组件
			 * @param {String} id   唯一标识
			 * @param {Object} opts 参数对象
			 * @param {String} opts.title 提示标题
			 * @param {Array} opts.items 选择器的数据
			 * @param {Object} opts.cancel 取消按钮的配置项
			 * @param {String} opts.cancel.text 取消按钮的文字
			 * @param {String} opts.cancel.className 添加自定义取消按钮的类
			 * @param {Function} opts.cancel.bindtap 点击取消按钮的回调函数
			 * @param {Object} opts.confirm 确定按钮的配置项
			 * @param {String} opts.confirm.text 确定按钮的文字
			 * @param {String} opts.confirm.className 添加自定义确定按钮的类
			 * @param {Function} opts.confirm.bindtap 点击确定按钮的回调函数
			 * @param {Function} opts.bindChange 监听值变化的回调函数
			 */
			render(id, opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const isMulti = isMultiFn(options.items)

				// 回调函数
				const callback = (cb) => {
					const picker = $scope.data.$wux.picker[id]
					const params = updateParam(picker.items, picker.value)
					typeof cb === 'function' && cb(params.value, params.values)
				}

				// 一位数组转化为二维数组
				!isMulti && (options.items = [options.items])

				// 渲染组件
				$scope.setData({
					[`$wux.picker.${id}`]: options, 
					[`$wux.picker.${id}.onCancel`]: `${id}Cancel`, 
					[`$wux.picker.${id}.onConfirm`]: `${id}Confirm`, 
					[`$wux.picker.${id}.onChange`]: `${id}Change`, 
				})

				// 绑定cancel事件
				$scope[`${id}Cancel`] = (e) => {
					that.setHidden(`picker.${id}`, ['weui-animate-slide-down', 'weui-animate-fade-out'])
					callback(options.cancel.bindtap)
				}

				// 绑定confirm事件
				$scope[`${id}Confirm`] = (e) => {
					that.setHidden(`picker.${id}`, ['weui-animate-slide-down', 'weui-animate-fade-out'])
					callback(options.confirm.bindtap)
				}

				// 绑定change事件
				$scope[`${id}Change`] = (e) => {
					const value = e && e.detail && e.detail.value || this.temp[id] || options.value || this.defaultValue(options.items)
					this.temp[id] = value
					$scope.setData({
						[`$wux.picker.${id}.value`]: value, 
					})
					callback(options.bindChange)
				}

				$scope[`${id}Change`]()

				that.setVisible(`picker.${id}`, ['weui-animate-slide-up', 'weui-animate-fade-in'])
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