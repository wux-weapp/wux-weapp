import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			title: `请选择`, 
			cols: [], 
			value: [], 
			toolbar: true, 
			toolbarCloseText: `完成`, 
			onChange() {}
		}
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
	 * @param {Array} opts.cols 选择器的数据
	 * @param {String} opts.cols.className 自定义每一列的类
	 * @param {Array} opts.cols.values 自定义每一列的数据
	 * @param {Array} opts.value 选择器的默认值
	 * @param {Boolean} opts.toolbar 是否显示工具栏
	 * @param {String} opts.toolbarCloseText 关闭按钮的文案
	 * @param {Function} opts.onChange 监听值变化的回调函数
	 */
	init(id, opts = {}) {
		const that = this
		const updateValue = (cols = [], arrValues = []) => {
			let newValue = []
			let newValueIndex = []
			let newDisplayValue = []

			for (let i = 0; i < cols.length; i++) {
				if (cols[i]) {
					const values = cols[i].values || []
					const displayValues = cols[i].displayValues || []
					const valueIndex = arrValues[i]

					newValueIndex.push( typeof values[valueIndex] !== `undefined` ? valueIndex : 0)
					newValue.push( typeof values[valueIndex] !== `undefined` ? values[valueIndex] : values[0])
					newDisplayValue.push( typeof displayValues[valueIndex] !== `undefined` ? displayValues[valueIndex] : undefined)
				}
			}

			if (newValue.indexOf(undefined) >= 0) {
				return !1
			}

			return {
				value: newValue, 
				valueIndex: newValueIndex, 
				displayValue: newDisplayValue, 
			}
		}

		const options = Object.assign({}, this.setDefaults(), opts)

		options.value = updateValue(options.cols, options.value).valueIndex

		// 实例化组件
		const component = new Component({
			scope: `$wux.picker.${id}`, 
			data: options, 
			methods: {
				/**
				 * 隐藏
				 */
				hide(e) {
					this.setHidden([`wux-animate--slide-out-down`, `wux-animate--fade-out`])
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible([`wux-animate--slide-in-up`, `wux-animate--fade-in`])
				},
				/**
				 * 当滚动选择，value 改变时触发 change 事件
				 */
				bindChange(e) {
					this.render(e.detail.value)
				},
				/**
				 * 更新组件
				 */
				updateValue: updateValue, 
				/**
				 * 渲染组件
				 */
				render(value = []) {
					const cols = this.getComponentData().cols
					const params = this.updateValue(cols, value)
					that.temp[id] = value
					this.setData({
						[`$wux.picker.${id}.value`]: params.valueIndex, 
					})
					typeof options.onChange === `function` && options.onChange(params)
				},
			}
		})
		
    	component.show()
    	component.render(that.temp[id] || options.value)
	},
}