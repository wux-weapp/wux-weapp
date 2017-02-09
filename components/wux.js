import pickerCity from 'picker-city'
import qrjs from 'qr.js/index'

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
			picker: {},
			pickerCity: {
				visible: !1, 
			},
			toptips: {
				visible: !1, 
			},
			gallery: {
				visible: !1, 
			},
			xnumber: {},
		}
		
		this.$scope.setData({
			[`$wux`]: this.$wux
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
		this.__initPicker()
		this.__initPickerCity()
		this.__initToptips()
		this.__initQrcode()
		this.__initGallery()
		this.__initXnumber()
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
					that.setVisible(['dialog'], !1)
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

				that.setVisible(['dialog'], !0)

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
						that.setVisible(['toast'], !1)
						typeof cb === 'function' && cb()
					}, options.timer)
				}

				// 判断提示类型，显示对应的图标
				TOAST_TYPES.forEach((value, key) => {
    				if (value.type === opts.type) {
    					options.type = value.icon
    					options.cls = value.cls
    				}
    			})

				$scope.setData({
					[`$wux.toast`]: options, 
				})

				that.setVisible(['toast'], !0)

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
			 * @param {String} opts.text 提示文本
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)

				$scope.setData({
					[`$wux.loading`]: options, 
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
			 * @param {Number} opts.max 最大值
			 * @param {String} opts.star 图标
			 * @param {Number} opts.value 默认值
			 * @param {String} opts.activeColor 图标激活的颜色
			 * @param {Number} opts.margin 图标外边距
			 * @param {Number} opts.fontSize 图标大小
			 * @param {Boolean} opts.disabled 禁用点击
			 * @param {Function} opts.callback 点击事件的回调函数
			 */
			render(id, opts = {}) {
				const that = this
				const data = that.data()
				const options = extend(data, clone(that.defaults), opts)

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

					if (disabled) return !1

					if (value === i + 1) {
						$scope.setData({
							[`$wux.rater.${id}.value`]: i
						})
					} else {
						$scope.setData({
							[`$wux.rater.${id}.value`]: i + 1
						})
					}

					this.updateStyle(id)
					this.updateValue(id)

					typeof options.callback === 'function' && options.callback(e)
				}

				this.updateStars(id)
				this.updateStyle(id)
				this.updateValue(id)
			},
			/**
			 * 更新stars
			 */
			updateStars(id) {
				const rater = $scope.data.$wux.rater[id]
				const max = rater.max
				const stars = []

				for (let i = 0; i < max; i++) {
					stars.push(i)
				}

				$scope.setData({
					[`$wux.rater.${id}.stars`]: stars
				})
		    },
		    /**
		     * 更新style
		     */
		    updateStyle(id) {
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
			},
			/**
			 * 更新value
			 */
			updateValue(id) {
				const rater = $scope.data.$wux.rater[id]
				const value = rater.value
				const _val = value.toString().split('.')
				const sliceValue = _val.length === 1 ? [_val[0], 0] : _val

				$scope.setData({
					[`$wux.rater.${id}.cutIndex`]: sliceValue[0] * 1, 
					[`$wux.rater.${id}.cutPercent`]: sliceValue[1] * 10, 
				})
			},
		}
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
					that.setVisible([`picker.${id}`], !1)
					callback(options.cancel.bindtap)
				}

				// 绑定confirm事件
				$scope[`${id}Confirm`] = (e) => {
					that.setVisible([`picker.${id}`], !1)
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

				that.setVisible([`picker.${id}`], !0)
			},
		}
	}

	/**
	 * 城市选择器
	 */
	__initPickerCity() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope
		const raw = pickerCity

		// 格式化
		const format = (data) => {
			let result = []
			for(let i=0; i < data.length; i++) {
				let d = data[i]
				if(/^请选择|市辖区/.test(d.name)) continue
				result.push(d)
			}
			if(result.length) return result
			return []
		}

		// 获取子级
		const sub = (data) => {
			if(!data.sub) return [{ name: '', code: data.code }]
			return format(data.sub)
		}

		// 获取城市
		const getCities = (d) => {
			for(let i = 0; i < raw.length; i++) {
				if(raw[i].code === d || raw[i].name === d) return sub(raw[i])
			}
			return []
		}

		// 获取区县
		const getDistricts = (p, c) => {
			for(let i = 0; i < raw.length; i++) {
				if(raw[i].code === p || raw[i].name === p) {
					for(let j = 0; j < raw[i].sub.length; j++) {
						if(raw[i].sub[j].code === c || raw[i].sub[j].name === c) {
							return sub(raw[i].sub[j])
						}
					}
				}
			}
		}

		// 获取组件参数
		const updateCols = (value = [0, 0, 0]) => {
			const provincesName = raw.map((d) => d.name)
			const provincesCode = raw.map((d) => d.code)

			const initCities = sub(raw[value[0]])
			const initCitiesName = initCities.map((c) => c.name)
			const initCitiesCode = initCities.map((c) => c.code)

			const initDistricts = sub(raw[value[0]].sub[value[1]])
			const initDistrictsName = initDistricts.map((c) => c.name)
			const initDistrictsCode = initDistricts.map((c) => c.code)

			return [
				{
					displayValues: provincesName,
					values: provincesCode,
				},
				{
					displayValues: initCitiesName,
					values: initCitiesCode,
				},
				{
					values: initDistrictsCode,
					displayValues: initDistrictsName,
				}
			]
		}

		// 更新参数
		const updateParam = (items, value) => {
			const params = {
				value: value, 
				values: [], 
				displayValues: [], 
			}

			items.forEach((n, i) => {
				params.values.push(n.values[value[i]])
				params.displayValues.push(n.displayValues[value[i]])
			})
			
			return params
		}

		// 更新picker数据
		const updateItems = (cols) => {
			let items = []
			cols.forEach((n, i) => {
				items.push(n.displayValues)
			})
			return items
		}

		that.$wuxPickerCity = {
			/**
			 * 默认参数
			 */
			defaults: {
				title: '请选择', 
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
			data() {
				return {
					value: [0, 0, 0], 
					cols: updateCols(), 
				}
			},
			/**
			 * 缓存上一次滑动的位置
			 */
			temp: {},
			/**
			 * 渲染城市选择器组件
			 * @param {String} id   唯一标识
			 * @param {String} opts.title 提示标题
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
				const data = this.data()
				const options = extend(data, clone(this.defaults), opts)

				// 回调函数
				const callback = (cb) => {
					const pickerCity = $scope.data.$wux.pickerCity[id]
					const params = updateParam(pickerCity.cols, pickerCity.value)
					typeof cb === 'function' && cb(params.value, params.values, params.displayValues)
				}

				// 更新视图
				const updateView = (value) => {
					const cols = updateCols(value)
					const items = updateItems(cols)
					$scope.setData({
						[`$wux.pickerCity.${id}.cols`]: cols, 
						[`$wux.pickerCity.${id}.items`]: items, 
						[`$wux.pickerCity.${id}.value`]: value, 
					})
				}
				
				// 渲染组件
				$scope.setData({
					[`$wux.pickerCity.${id}`]: options, 
					[`$wux.pickerCity.${id}.onCancel`]: `${id}Cancel`, 
					[`$wux.pickerCity.${id}.onConfirm`]: `${id}Confirm`, 
					[`$wux.pickerCity.${id}.onChange`]: `${id}Change`, 
				})

				// 绑定cancel事件
				$scope[`${id}Cancel`] = (e) => {
					that.setVisible([`pickerCity.${id}`], !1)
					callback(options.cancel.bindtap)
				}

				// 绑定confirm事件
				$scope[`${id}Confirm`] = (e) => {
					that.setVisible([`pickerCity.${id}`], !1)
					callback(options.confirm.bindtap)
				}

				// 绑定change事件
				$scope[`${id}Change`] = (e) => {
					const value = e && e.detail && e.detail.value || this.temp[id] || options.value || [0, 0, 0]
					this.temp[id] = value
					updateView(value)
					callback(options.bindChange)
				}

				$scope[`${id}Change`]()

				that.setVisible([`pickerCity.${id}`], !0)
			},
		}
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
					that.setVisible(['toptips'], !1)
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

				that.setVisible(['toptips'], !0)

				return _toptips.hide
			},
		}
	}

	/**
	 * 二维码
	 */
	__initQrcode() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxQrcode = {
			/**
			 * 默认参数
			 */
			defaults: {
				typeNumber: -1, 
				errorCorrectLevel: 2, 
				width: 200, 
				height: 200, 
				fgColor: 'black', 
				bgColor: 'white', 
			},
			/**
			 * 初始化qrcode组件
			 * @param {String} id 	唯一标识
			 * @param {String} data 文本内容
			 * @param {Object} opts 参数对象
			 * @param {Number} opts.typeNumber 类型
			 * @param {Number} opts.errorCorrectLevel 误差校正等级
			 * @param {Number} opts.width canvas宽度
			 * @param {Number} opts.height canvas高度
			 * @param {String} opts.fgColor 前景色
			 * @param {String} opts.bgColor 背景色
			 */
			init(id, data, opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const qrcode = qrjs(data, {
					typeNumber: options.typeNumber, 
					errorCorrectLevel: options.errorCorrectLevel, 
				})
				const ctx = wx.createCanvasContext(id)
				const cells = qrcode.modules
				const tileW = options.width / cells.length
				const tileH = options.height / cells.length

				ctx.scale(1, 1)

				cells.forEach((row, rdx) => {
					row.forEach((cell, cdx) => {
						ctx.setFillStyle(cell ? options.fgColor : options.bgColor)
						const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
						const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
						ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
					})
				})

				ctx.draw()
			},
		}
	}

	/**
	 * 画廊组件
	 */
	__initGallery() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxGallery = {
			/**
			 * 默认参数
			 */
			defaults: {
				current: 0, 
				urls: [], 
				delete: function() {}, 
				callback: function() {}, 
			},
			/**
			 * 显示gallery组件
			 * @param {Object} opts 参数对象
			 * @param {Number} opts.current 当前显示图片的索引值
			 * @param {Array} opts.urls 需要预览的图片链接列表
			 * @param {Function} opts.delete 点击删除的回调函数
			 * @param {Function} opts.callback 点击关闭的回调函数
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const hide = () => {
					that.setVisible(['gallery'], !1)
					typeof options.callback === 'function' && options.callback()
				}

				// 渲染组件
				$scope.setData({
					[`$wux.gallery`]: options, 
					[`$wux.gallery.onHide`]: `galleryHide`, 
					[`$wux.gallery.onDelete`]: `galleryDelete`, 
					[`$wux.gallery.onChange`]: `galleryChange`, 
				})

				// 绑定hide事件
				$scope[`galleryHide`] = hide

				// 绑定delete事件
				$scope[`galleryDelete`] = (e) => {
					if(typeof options.delete === 'function') {
						const gallery = $scope.data.$wux.gallery
						if (options.delete(gallery.current, options.urls) === true) {
							hide()
						}
					}
				}

				// 绑定change事件
				$scope[`galleryChange`] = (e) => {
					$scope.setData({
						[`$wux.gallery.current`]: e.detail.current, 
					})
				}

				that.setVisible(['gallery'], !0)
			}
		}
	}

	/**
	 * 计数器
	 */
	__initXnumber() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxXnumber = {
			/**
			 * 默认参数
			 */
			defaults: {
				min: undefined, 
				max: undefined, 
				step: 1, 
				value: 0, 
				disabled: !0, 
				className: '', 
				callback: function() {}, 
			},
			/**
			 * 渲染xnumber组件
			 * @param {String} id   唯一标识
			 * @param {Object} opts 参数对象
			 * @param {Number} opts.min 最小值
			 * @param {Number} opts.max 最大值
			 * @param {Number} opts.step 计数间隔
			 * @param {Number} opts.value 默认值
			 * @param {Boolean} opts.disabled 禁用点击
			 * @param {String} opts.className 添加自定义类
			 * @param {Function} opts.callback 监听值变化的回调函数
			 */
			render(id, opts = {}) {

				let timeout = null

				const options = extend({
					id: id, 
				}, clone(this.defaults), opts)

				// 更新组件
				const updateValues = (value) => {
					const xnumber = $scope.data.$wux.xnumber[id]

					// 最小值
					if (xnumber.min && value < xnumber.min) {
						value = xnumber.min
					}

					// 最大值
					if (xnumber.max && value > xnumber.max) {
						value = xnumber.max
					}

					// 更新数值，判断最小或最大值禁用sub或add按钮
					$scope.setData({
						[`$wux.xnumber.${id}.value`]: value, 
						[`$wux.xnumber.${id}.disabledMin`]: typeof xnumber.min === 'undefined' ? !1 : value <= xnumber.min, 
						[`$wux.xnumber.${id}.disabledMax`]: typeof xnumber.max === 'undefined' ? !1 : value >= xnumber.max, 
					})

					typeof options.callback === 'function' && options.callback(value)
				}

				// 渲染组件
				$scope.setData({
					[`$wux.xnumber.${id}`]: options, 
					[`$wux.xnumber.${id}.onSub`]: `${id}Sub`, 
					[`$wux.xnumber.${id}.onAdd`]: `${id}Add`, 
					[`$wux.xnumber.${id}.onChange`]: `${id}Change`, 
				})

				// 绑定sub事件
				$scope[`${id}Sub`] = (e) => {
					const xnumber = $scope.data.$wux.xnumber[id]
					if (xnumber.disabledMin) return !1
					updateValues(xnumber.value - xnumber.step)
				}

				// 绑定add事件
				$scope[`${id}Add`] = (e) => {
					const xnumber = $scope.data.$wux.xnumber[id]
					if (xnumber.disabledMax) return !1
					updateValues(xnumber.value + xnumber.step)
				}

				// 绑定change事件
				$scope[`${id}Change`] = (e) => {
					if (timeout) clearTimeout(timeout)
					timeout = setTimeout(() => {
						updateValues(Number(e.detail.value) || 0)
					}, 300)
				}

				// 初始化时立即更新一次组件
				updateValues(options.value)
			},
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