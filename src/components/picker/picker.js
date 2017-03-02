import Component from '../component'

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
	defaultValue(items) {
		let value = [], len = items.length, i = 0
		for(i = 0; i < len; i ++) {
			value.push(0)
		}
		return value
	},
	/**
	 * 更新参数
	 */
	updateParam(items, value) {
		const params = {
			value: value, 
			values: [], 
		}

		items.forEach((n, i) => {
			params.values.push(n[value[i]])
		})

		return params
	},
	/**
	 * 判断二维数组
	 */
	isMultiFn(items) {
		for(let i = 0, len = items.length; i < len; i++) {
			if(items[i] instanceof Array) return !0
		}
		return !1
	},
	/**
	 * 缓存上一次滑动的位置
	 */
	temp: {},
	/**
	 * 渲染选择器组件
	 * @param {String} id   唯一标识
	 * @param {Object} opts 配置项
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
	 * @param {Function} opts.onChange 监听值变化的回调函数
	 */
	init(id, opts = {}) {
		const that = this
		const options = Object.assign({}, this.setDefaults(), opts)
		const isMulti = that.isMultiFn(options.items)

		// 一位数组转化为二维数组
		!isMulti && (options.items = [options.items])
    	
		// 回调函数
		const callback = (page, cb) => {
			const picker = page.data.$wux.picker[id]
			const params = that.updateParam(picker.items, picker.value)
			typeof cb === `function` && cb(params.value, params.values)
		}

		// 实例化组件
		const component = new Component({
			scope: `$wux.picker.${id}`, 
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
					const value = e && e.detail && e.detail.value || that.temp[id] || options.value || that.defaultValue(options.items)
					that.temp[id] = value
					this.page.setData({
						[`$wux.picker.${id}.value`]: value, 
					})
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