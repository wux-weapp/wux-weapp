import tools from '../tools/tools'

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
		const rater = {}
		
		this.$scope.setData({
			[`$wux.rater`]: rater, 
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
		this.__initRater()
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
				const data = this.data()
				const options = extend(data, clone(this.defaults), opts)

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

				that.setVisible(`rater.${id}`)
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