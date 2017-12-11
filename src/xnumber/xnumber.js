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
			longpress: !1, 
			className: undefined, 
			callback() {}, 
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
	 * @param {Boolean} opts.disabled 禁用输入
	 * @param {Boolean} opts.longpress 禁用长按
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
	    			const xnumber = this.getComponentData()

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
	    		 * 数字计算函数
	    		 */
				calculation(type, meta) {
					const xnumber = this.getComponentData()

					if (type === `add`) {
						if (xnumber.disabledMax) return !1
						this.updateValues(xnumber.value + xnumber.step)
					}

					if (type === `sub`) {
						if (xnumber.disabledMin) return !1
						this.updateValues(xnumber.value - xnumber.step)
					}

					if (options.longpress && meta) {
						this.timeout = setTimeout(() => this.calculation(type, meta), 100)
					}
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
				/**
				 * 手指触摸动作开始
				 */
				bindtouchstart(e) {
					this.startTime = e.timeStamp
				},
				/**
				 * 	手指触摸动作结束
				 */
				bindtouchend(e) {
					this.endTime = e.timeStamp
					if (this.timeout) {
						clearTimeout(this.timeout)
					}
				},
				/**
				 * 手指触摸动作被打断，如来电提醒，弹窗
				 */
				touchcancel(e) {
					this.endTime = e.timeStamp
					if (this.timeout) {
						clearTimeout(this.timeout)
					}
				},
				/**
				 * 手指触摸后，超过350ms再离开
				 */
				bindlongtap(e) {
					const type = e.currentTarget.dataset.type
					if (options.longpress) {
						this.calculation(type, !0)
					}
				},
				/**
				 * 手指触摸后马上离开
				 */
				bindtap(e) {
					const type = e.currentTarget.dataset.type
					const timeDiff = this.endTime  - this.startTime < 350
					if (!options.longpress || options.longpress && timeDiff) {
						this.calculation(type, !1)
					}
				},
			},
    	})

		// 初始化时立即更新一次组件
		component.updateValues(options.value)
	},
}