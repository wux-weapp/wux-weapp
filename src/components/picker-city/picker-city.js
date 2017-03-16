import Component from '../component'
import data from 'data'

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
	if(!data.sub) return [{ name: ``, code: data.code }]
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
	value[1] > initCities.length-1 && (value[1] = initCities.length-1)

	const initDistricts = sub(raw[value[0]].sub[value[1]])
	const initDistrictsName = initDistricts.map((c) => c.name)
	const initDistrictsCode = initDistricts.map((c) => c.code)
	value[2] > initDistricts.length-1 && (value[2] = initDistricts.length-1)

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

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			title: `请选择`, 
			items: [], 
			cancel: {
				text: `取消`, 
				className: ``, 
				bindtap: function() { 
					return !1
				},
			},
			confirm: {
				text: `确定`, 
				className: ``, 
				bindtap: function() { 
					return !0
				},
			},
			onChange: function() {}
		}
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
	 * @param {Function} opts.onChange 监听值变化的回调函数
	 */
	init(id, opts = {}) {
		const that = this
		const options = Object.assign({}, this.data(), this.setDefaults(), opts)
    	
		// 回调函数
		const callback = (page, cb) => {
			const pickerCity = page.data.$wux.pickerCity[id]
			const params = updateParam(pickerCity.cols, pickerCity.value)
			typeof cb === `function` && cb(params.value, params.values, params.displayValues)
		}

		// 更新视图
		const updateView = (page, value) => {
			const cols = updateCols(value)
			const items = updateItems(cols)
			page.setData({
				[`$wux.pickerCity.${id}.cols`]: cols, 
				[`$wux.pickerCity.${id}.items`]: items, 
				[`$wux.pickerCity.${id}.value`]: value, 
			})
		}

		// 实例化组件
		const component = new Component({
			scope: `$wux.pickerCity.${id}`, 
			data: options, 
			methods: {
				/**
				 * 点击取消按钮时会触发 cancel 事件
				 */
				onCancel(e) {
					this.setHidden([`weui-animate-slide-down`, `weui-animate-fade-out`])
					callback(this.page, options.cancel.bindtap)
				},
				/**
				 * 点击确定按钮时会触发 confirm 事件
				 */
				onConfirm(e) {
					this.setHidden([`weui-animate-slide-down`, `weui-animate-fade-out`])
					callback(this.page, options.confirm.bindtap)
				},
				/**
				 * 当滚动选择，value 改变时触发 change 事件
				 */
				bindChange(e) {
					const value = e && e.detail && e.detail.value || that.temp[id] || options.value || [0, 0, 0]
					that.temp[id] = value
					updateView(this.page, value)
					callback(this.page, options.onChange)
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible([`weui-animate-slide-up`, `weui-animate-fade-in`])
				},
			}
		})

    	component.bindChange()
    	component.show()
	},
}