import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			max: 5, 
			star: `★`, 
			value: 0, 
			activeColor: `#fc6`, 
			margin: 2, 
			fontSize: 25, 
			disabled: !1, 
			text: [], 
			defaultTextColor: `#999`, 
			callback() {}, 
		}
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
	 * @param {Object} opts 配置项
	 * @param {Number} opts.max 最大值
	 * @param {String} opts.star 图标
	 * @param {Number} opts.value 默认值
	 * @param {String} opts.activeColor 图标激活的颜色
	 * @param {Number} opts.margin 图标外边距
	 * @param {Number} opts.fontSize 图标大小
	 * @param {Boolean} opts.disabled 禁用点击
	 * @param {Array} opts.text 设置提示文字
	 * @param {String} opts.text.classNmae 提示的类
	 * @param {String} opts.text.text 提示的文字
	 * @param {String} opts.text.color 提示的文字颜色
	 * @param {String} opts.defaultTextColor 设置提示的默认文字颜色
	 * @param {Function} opts.callback 点击事件的回调函数
	 */
	init(id, opts = {}) {
		const options = Object.assign({
			animateCss: undefined, 
            visible: !1, 
		}, this.data(), this.setDefaults(), opts)

		// 更新stars
		const updateStars = (id, vm) => {
			const rater = vm.getComponentData()
			const max = rater.max
			const stars = []

			for (let i = 0; i < max; i++) {
				stars.push(i)
			}

			vm.setData({
				[`$wux.rater.${id}.stars`]: stars
			})
		}
		
		// 更新style
		const updateStyle = (id, vm) => {
			const rater = vm.getComponentData()
			const max = rater.max
			const value = rater.value
			const activeColor = rater.activeColor
			const colors = []

			for (let j = 0; j < max; j++) {
				if (j <= value - 1) {
					colors.push(activeColor)
				} else {
					colors.push(`#ccc`)
				}
				vm.setData({
					[`$wux.rater.${id}.colors`]: colors
				})
			}
		}
		
		// 更新value
		const updateValue = (id, vm) => {
			const rater = vm.getComponentData()
			const value = rater.value
			const _val = value.toString().split(`.`)
			const sliceValue = _val.length === 1 ? [_val[0], 0] : _val

			vm.setData({
				[`$wux.rater.${id}.cutIndex`]: sliceValue[0] * 1, 
				[`$wux.rater.${id}.cutPercent`]: sliceValue[1] * 10, 
			})
		}

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.rater.${id}`, 
    		data: options, 
    		methods: {
    			/**
    			 * 点击触发事件
    			 */
				handlerClick(e) {
					const i = e.currentTarget.dataset.index
					const rater = this.getComponentData()
					const value = rater.value
					const disabled = rater.disabled

					if (disabled) return !1
						
					this.update(value === i + 1 ? i : i + 1)
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible()
				},
				/**
				 * 更新 value
				 */
				update(value = 0) {
					const rater = this.getComponentData()
					const _val = Number(value)

					this.setData({
						[`$wux.rater.${id}.value`]: _val < 0 ? 0 : _val > rater.max ? rater.max : _val
					})
					
					updateStyle(id, this)
					updateValue(id, this)

					typeof options.callback === `function` && options.callback(rater.value, rater, options.text)
				},
			},
    	})

    	updateStars(id, component)
		updateStyle(id, component)
		updateValue(id, component)

    	component.show()

    	return component
	},
}