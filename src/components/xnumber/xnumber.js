import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			min: undefined, 
			max: undefined, 
			step: 1, 
			value: 0, 
			disabled: !0, 
			className: undefined, 
			callback: function() {}, 
		}
	},
	/**
	 * 渲染xnumber组件
	 * @param {String} id   唯一标识
	 * @param {Object} opts 配置项
	 * @param {Number} opts.min 最小值
	 * @param {Number} opts.max 最大值
	 * @param {Number} opts.step 计数间隔
	 * @param {Number} opts.value 默认值
	 * @param {Boolean} opts.disabled 禁用点击
	 * @param {String} opts.className 自定义类名
	 * @param {Function} opts.callback 监听值变化的回调函数
	 */
	init(id, opts = {}) {

		let timeout = null

		const options = Object.assign({
			id, 
		}, this.setDefaults(), opts)

    	// 实例化组件
    	const component = new Component({
    		scope: `$wux.xnumber.${id}`, 
    		data: options, 
    		methods: {
    			/**
    			 * 更新值
    			 */
	    		updateValues(value) {
	    			const xnumber = this.page.data.$wux.xnumber[id]

					// 最小值
					if (xnumber.min && value < xnumber.min) {
						value = xnumber.min
					}

					// 最大值
					if (xnumber.max && value > xnumber.max) {
						value = xnumber.max
					}

					// 更新数值，判断最小或最大值禁用sub或add按钮
					this.page.setData({
						[`$wux.xnumber.${id}.value`]: value, 
						[`$wux.xnumber.${id}.disabledMin`]: typeof xnumber.min === `undefined` ? !1 : value <= xnumber.min, 
						[`$wux.xnumber.${id}.disabledMax`]: typeof xnumber.max === `undefined` ? !1 : value >= xnumber.max, 
					})

					typeof options.callback === `function` && options.callback(value)
	    		},
	    		/**
	    		 * 点击 - 按钮时会触发 onSub 事件
	    		 */
				onSub(e) {
					const xnumber = this.page.data.$wux.xnumber[id]
					if (xnumber.disabledMin) return !1
					this.updateValues(xnumber.value - xnumber.step)
				},
				/**
				 * 点击 + 按钮时会触发 onAdd 事件
				 */
				onAdd(e) {
					const xnumber = this.page.data.$wux.xnumber[id]
					if (xnumber.disabledMax) return !1
					this.updateValues(xnumber.value + xnumber.step)
				},
				/**
				 * 当键盘输入时，触发 input 事件
				 */
				bindinput(e) {
					if (timeout) clearTimeout(timeout)
					timeout = setTimeout(() => {
						this.updateValues(Number(e.detail.value) || 0)
					}, 300)
				},
			},
    	})

		// 初始化时立即更新一次组件
		component.updateValues(options.value)
	},
}