/**
 * wux组件
 * @param {Object} $scope   作用域对象
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
			backdrop: {
				visible: !1, 
			},
			dialog: {
				visible: !1, 
			},
			toast: {
				visible: !1, 
			},
			loading: {
				visible: !1, 
			},
			rater: {},
		}
		
		this.$scope.setData({
			'$wux': this.$wux
		})
	}

	/**
	 * 工具方法
	 */
	__initTools() {
    	this.tools = {
    		isArray(value) {
				return Array.isArray(value)
			},
			isFunction(value) {
				return typeof value === 'function'
			},
			isDefined(value) {
				return typeof value !== 'undefined'
			},
			isObject(value) {
				return value !== null && typeof value === 'object'
			},
			type(obj) {
				const toString = Object.prototype.toString

				if ( obj == null ) {
					return obj + ''
				}

				return typeof obj === 'object' || typeof obj === 'function' ? toString.call(obj) || 'object' : typeof obj
			},
			clone(obj) {
			    if (typeof obj !== 'object' || !obj) {
			        return obj
			    }
			    let copy = {}
			    for (let attr in obj) {
			        if (obj.hasOwnProperty(attr)) {
			            copy[attr] = obj[attr]
			        }
			    }
			    return copy
			},
			each(obj, iterator) {
			    let i, key
			    if (obj && typeof obj.length === 'number') {
			        for (i = 0; i < obj.length; i++) {
			            iterator.call(obj[i], obj[i], i)
			        }
			    } else if (this.isObject(obj)) {
			        for (key in obj) {
			            if (obj.hasOwnProperty(key)) {
			                iterator.call(obj[key], obj[key], key)
			            }
			        }
			    }
			    return obj
			},
			isPlainObject(obj) {
				let getProto = Object.getPrototypeOf
				let class2type = {}
				let toString = class2type.toString
				let hasOwn = class2type.hasOwnProperty
				let fnToString = hasOwn.toString
				let ObjectFunctionString = fnToString.call(Object)
				let proto, Ctor
				if (!obj || this.type(obj) !== '[object Object]') {
					return !1
				}
				proto = getProto( obj )
				if ( !proto ) {
					return !0
				}
				Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
				return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
			},
			extend() {
				let src, copyIsArray, copy, name, options, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = !1;

				if (typeof target === 'boolean') {
					deep = target
					target = arguments[ i ] || {}
					i++
				}

				if (typeof target !== 'object' && !this.isFunction(target)) {
					target = {}
				}

				if (i === length) {
					target = this
					i--
				}

				for (; i < length; i++) {
					if ( (options = arguments[ i ]) != null ) {
						for (name in options) {
							src = target[name]
							copy = options[name]

							if (target === copy) {
								continue
							}

							if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
								if (copyIsArray) {
									copyIsArray = !1
									clone = src && isArray(src) ? src : []
								} else {
									clone = src && this.isPlainObject(src) ? src : {}
								}
								target[name] = this.extend(deep, clone, copy)
							} else if (copy !== undefined) {
								target[name] = copy
							}
						}
					}
				}
				return target
			},
    	}
    }

    /**
     * 初始化所有组件
     */
    __initComponents() {
    	this.__initBackdrop()
		this.__initDialog()
		this.__initToast()
		this.__initLoading()
		this.__initRater()
    }

    /**
     * 背景幕组件
     */
	__initBackdrop() {
		const that = this
		const $scope = that.$scope 

		that.$wuxBackdrop = {
			/**
			 * 锁定次数
			 */
			backdropHolds: 0,
			/**
			 * 保持锁定
			 */
			retain() {
				this.backdropHolds++
				if (this.backdropHolds === 1) {
					that.setVisible(['backdrop'], !0)
				}
			},
			/**
			 * 释放锁定
			 */
			release() {
				if (this.backdropHolds === 1) {
					that.setVisible(['backdrop'], !1)
				}
				this.backdropHolds = Math.max(0, this.backdropHolds - 1)
			},
		}
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
				dialogConfirm: 'dialogConfirm', 
				dialogCancel: 'dialogCancel', 
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 */
			open(opts = {}) {
				const options = extend(clone(this.defaults), opts || {})

				// 绑定tap事件
				$scope.dialogConfirm = () => hideDialog(options.confirm)
				$scope.dialogCancel = () => hideDialog(options.cancel)

				// 隐藏
				function hideDialog(cb) {
					that.setVisible(['dialog'], !1)
					typeof cb === 'function' && cb()
				}

				// 显示
				function showDialog() {
					$scope.setData({
						'$wux.dialog': options, 
					})
					that.setVisible(['dialog'], !0)
				}

				showDialog()

				return $scope.dialogCancel
			},
		}
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
				cls: 'weui-toast-success',
			},
			{
				type: 'cancel',
				icon: 'cancel',
				cls: 'weui-toast-cancel',
			},
			{
				type: 'forbidden',
				icon: 'warn',
				cls: 'weui-toast-forbidden',
			},
			{
				type: 'text',
				icon: '',
				cls: 'weui-toast-text',
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
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts || {})
				
				TOAST_TYPES.forEach((value, key) => {
    				if (value.type === opts.type) {
    					options.type = value.icon
    					options.cls = value.cls
    				}
    			})

				$scope.setData({
					'$wux.toast': options, 
				})

				that.setVisible(['toast'], !0)

				function remove(cb) {
					setTimeout(() => {
						that.setVisible(['toast'], !1)
						typeof cb === 'function' && cb()
					}, options.timer)
				}

				remove(options.success)
			},
		}
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
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts || {})

				$scope.setData({
					'$wux.loading': options, 
				})

				that.setVisible(['loading'], !0)
			},
			/**
			 * 隐藏loading组件
			 */
			hide() {
				that.setVisible(['loading'], !1)
			},
		}
	}

	/**
	 * 评分组件
	 */
	__initRater() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope 

		that.$wuxRater = {
			/**
			 * 默认参数
			 */
			defaults: {
				max: 5, 
				star: '★', 
				value: 0, 
				activeColor: '#fc6', 
				margin: 2, 
				fontSize: 25, 
				disabled: !1, 
				callback: function() {}, 
			},
			/**
			 * 默认数据
			 */
			data() {
				return {
					stars: [], 
					colors: [], 
					cutIndex: -1, 
					cutPercent: 0, 
				}
			},
			/**
			 * 渲染评分组件
			 * @param {String} id   唯一标识
			 * @param {Object} opts 参数对象
			 */
			render(id, opts) {
				const data = this.data()
				const options = extend(data, clone(this.defaults), opts || {})

				// 渲染组件
				$scope.setData({
					[`$wux.rater.${id}`]: options, 
					[`$wux.rater.${id}.handleClick`]: `${id}HandleClick`, 
				})

				// 绑定tap事件
				$scope[`${id}HandleClick`] = (e) => {
					const i = e.currentTarget.dataset.index
					const rater = $scope.data.$wux.rater[id]
					const value = rater.value
					const disabled = rater.disabled

					if (disabled) return

					if (value === i + 1) {
						$scope.setData({
							[`$wux.rater.${id}.value`]: i
						})
					} else {
						$scope.setData({
							[`$wux.rater.${id}.value`]: i + 1
						})
					}

					updateStyle()
					updateValue()

					typeof options.callback === 'function' && options.callback(e)
				}

				// 更新stars
				function updateStars() {
					const rater = $scope.data.$wux.rater[id]
					const max = rater.max
					const stars = []

					for (let i = 0; i < max; i++) {
						stars.push(i)
					}

					$scope.setData({
						[`$wux.rater.${id}.stars`]: stars
					})
			    }

			    // 更新style
				function updateStyle() {
					const rater = $scope.data.$wux.rater[id]
					const max = rater.max
					const value = rater.value
					const activeColor = rater.activeColor
					const colors = []

					for (let j = 0; j < max; j++) {
						if (j <= value - 1) {
							colors.push(activeColor)
						} else {
							colors.push('#ccc')
						}
						$scope.setData({
							[`$wux.rater.${id}.colors`]: colors
						})
					}
				}

				// 更新value
				function updateValue() {
					const rater = $scope.data.$wux.rater[id]
					const value = rater.value
					const _val = value.toString().split('.')
					const sliceValue = _val.length === 1 ? [_val[0], 0] : _val
					$scope.setData({
						[`$wux.rater.${id}.cutIndex`]: sliceValue[0] * 1, 
						[`$wux.rater.${id}.cutPercent`]: sliceValue[1] * 10, 
					})
				}

				updateStars()
				updateStyle()
				updateValue()
			}
		}
	}

	/**
	 * 设置元素显示或隐藏
	 */
	setVisible(keys, value) {
    	keys.forEach(key => {
    		this.$scope.setData({
    			[`$wux.${key}.visible`]: value, 
    		})
    	})
    }
}

export default wux