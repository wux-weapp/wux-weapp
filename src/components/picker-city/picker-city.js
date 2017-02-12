import tools from '../tools/tools'
import data from 'data'

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
		const pickerCity = {}
		
		this.$scope.setData({
			[`$wux.pickerCity`]: pickerCity, 
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
		this.__initPickerCity()
    }

	/**
	 * 城市选择器
	 */
	__initPickerCity() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope
		const raw = data

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
					that.setHidden(`pickerCity.${id}`, ['weui-animate-slide-down', 'weui-animate-fade-out'])
					callback(options.cancel.bindtap)
				}

				// 绑定confirm事件
				$scope[`${id}Confirm`] = (e) => {
					that.setHidden(`pickerCity.${id}`, ['weui-animate-slide-down', 'weui-animate-fade-out'])
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

				that.setVisible(`pickerCity.${id}`, ['weui-animate-slide-up', 'weui-animate-fade-in'])
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