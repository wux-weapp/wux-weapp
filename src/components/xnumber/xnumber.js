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
		const xnumber = {}
		
		this.$scope.setData({
			[`$wux.xnumber`]: xnumber, 
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
		this.__initXnumber()
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
}

export default wux