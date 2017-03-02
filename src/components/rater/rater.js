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
			callback: function() {}, 
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
	 * @param {Function} opts.callback 点击事件的回调函数
	 */
	init(id, opts = {}) {
		const that = this
		const options = Object.assign({}, this.data(), this.setDefaults(), opts)

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.rater.${id}`, 
    		data: options, 
    		methods: {
    			/**
    			 * 点击触发事件
    			 */
				bindtap(e) {
					const i = e.currentTarget.dataset.index
					const rater = this.page.data.$wux.rater[id]
					const value = rater.value
					const disabled = rater.disabled

					if (disabled) return !1

					if (value === i + 1) {
						this.page.setData({
							[`$wux.rater.${id}.value`]: i
						})
					} else {
						this.page.setData({
							[`$wux.rater.${id}.value`]: i + 1
						})
					}

					that.updateStyle(id, this.page)
					that.updateValue(id, this.page)

					typeof options.callback === `function` && options.callback(e)
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible()
				},
			},
    	})

    	this.updateStars(id, component.page)
		this.updateStyle(id, component.page)
		this.updateValue(id, component.page)

    	component.show()
	},
	/**
	 * 更新stars
	 */
	updateStars(id, page) {
		const rater = page.data.$wux.rater[id]
		const max = rater.max
		const stars = []

		for (let i = 0; i < max; i++) {
			stars.push(i)
		}

		page.setData({
			[`$wux.rater.${id}.stars`]: stars
		})
    },
    /**
     * 更新style
     */
    updateStyle(id, page) {
		const rater = page.data.$wux.rater[id]
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
			page.setData({
				[`$wux.rater.${id}.colors`]: colors
			})
		}
	},
	/**
	 * 更新value
	 */
	updateValue(id, page) {
		const rater = page.data.$wux.rater[id]
		const value = rater.value
		const _val = value.toString().split(`.`)
		const sliceValue = _val.length === 1 ? [_val[0], 0] : _val

		page.setData({
			[`$wux.rater.${id}.cutIndex`]: sliceValue[0] * 1, 
			[`$wux.rater.${id}.cutPercent`]: sliceValue[1] * 10, 
		})
	},
}