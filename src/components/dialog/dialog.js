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
		const dialog = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.dialog`]: dialog, 
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
		this.__initDialog()
    }

	/**
	 * 对话框组件
	 */
	__initDialog() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxDialog = {
			/**
			 * 默认参数
			 */
			defaults: {
				title: '', 
				content: '', 
				buttons: [], 
			},
			/**
			 * 默认数据
			 */
			data() {
				return {
					onCancel: function() {}, 
		        	cancelText: '取消', 
		        	cancelType: 'weui-dialog__btn_default', 
		        	onConfirm: function() {}, 
		        	confirmText: '确定', 
		        	confirmType: 'weui-dialog__btn_primary', 
		        }
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.title 提示标题
			 * @param {String} opts.content 提示文本
			 * @param {Array} opts.buttons 按钮
			 * @param {String} opts.buttons.text 按钮的文字
			 * @param {String} opts.buttons.type 按钮的类型
			 * @param {Function} opts.buttons.onTap 按钮的点击事件
			 */
			open(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const self = {}

				// 隐藏
				self.hide = (cb) => {
					if (self.removed) return !1
					self.removed = !0
					that.setHidden('dialog')
					setTimeout(() => typeof cb === 'function' && cb(), 300)
				}

				// 显示
				self.show = () => {
					if (self.removed) return !1
					that.setVisible('dialog')
				}

				// 渲染组件
				$scope.setData({
					[`$wux.dialog`]: options, 
					[`$wux.dialog.buttonTapped`]: `dialogButtonTapped`, 
				})

				// 绑定tap事件
				$scope[`dialogButtonTapped`] = (e) => {
					const index = e.currentTarget.dataset.index
					const button = options.buttons[index]
					self.hide(() => typeof button.onTap === 'function' && button.onTap(e))
				}

				// 绑定input事件
				$scope[`dialogBindinput`] = (e) => {
					$scope.setData({
						[`$wux.dialog.prompt.response`]: e.detail.value, 
					})
				}

				self.show()

				return self.hide
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.title 提示标题
			 * @param {String} opts.content 提示文本
			 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
			 * @param {String} opts.confirmType 确定按钮的类型
			 * @param {Function} opts.onConfirm 确定按钮的点击事件
			 */
			alert(opts = {}) {
				return this.open(extend({
					buttons: [
						{
							text: opts.confirmText || this.data().confirmText, 
							type: opts.confirmType || this.data().confirmType, 
							onTap(e) {
								typeof opts.onConfirm === 'function' && opts.onConfirm(e)
							},
						},
					],
				}, opts))
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.title 提示标题
			 * @param {String} opts.content 提示文本
			 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
			 * @param {String} opts.confirmType 确定按钮的类型
			 * @param {Function} opts.onConfirm 确定按钮的点击事件
			 * @param {String} opts.cancelText 取消按钮的文字，默认为"取消"
			 * @param {String} opts.cancelType 取消按钮的类型
			 * @param {Function} opts.onCancel 取消按钮的点击事件
			 */
			confirm(opts = {}) {
				return this.open(extend({
					buttons: [
						{
							text: opts.cancelText || this.data().cancelText, 
							type: opts.cancelType || this.data().cancelType, 
							onTap(e) { 
								typeof opts.onCancel === 'function' && opts.onCancel(e)
							},
						},
						{
							text: opts.confirmText || this.data().confirmText, 
							type: opts.confirmType || this.data().confirmType, 
							onTap(e) { 
								typeof opts.onConfirm === 'function' && opts.onConfirm(e)
							},
						},
					],
				}, opts))
			},
			/**
			 * 显示dialog组件
			 * @param {Object} opts 参数对象
			 * @param {String} opts.title 提示标题
			 * @param {String} opts.content 提示文本
			 * @param {String} opts.fieldtype input 的类型，有效值：text, number, idcard, digit
			 * @param {Boolean} opts.password 是否是密码类型
			 * @param {String} opts.defaultText 默认值
			 * @param {String} opts.placeholder 输入框为空时占位符
			 * @param {Number} opts.maxlength 最大输入长度，设置为 -1 的时候不限制最大长度
			 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
			 * @param {String} opts.confirmType 确定按钮的类型
			 * @param {Function} opts.onConfirm 确定按钮的点击事件
			 * @param {String} opts.cancelText 取消按钮的文字，默认为"取消"
			 * @param {String} opts.cancelType 取消按钮的类型
			 * @param {Function} opts.onCancel 取消按钮的点击事件
			 */
			prompt(opts = {}) {
				const prompt = {
					fieldtype: opts.fieldtype ? opts.fieldtype : 'text', 
					password: !!opts.password, 
					response: opts.defaultText ? opts.defaultText : '', 
					placeholder: opts.placeholder ? opts.placeholder : '', 
					maxlength: opts.maxlength ? parseInt(opts.maxlength) : '', 
					bindinput: `dialogBindinput`
				}

				return this.open(extend({
					prompt: prompt, 
					buttons: [
						{
							text: opts.cancelText || this.data().cancelText, 
							type: opts.cancelType || this.data().cancelType, 
							onTap(e) { 
								typeof opts.onCancel === 'function' && opts.onCancel(e)
							},
						},
						{
							text: opts.confirmText || this.data().confirmText, 
							type: opts.confirmType || this.data().confirmType, 
							onTap(e) { 
								typeof opts.onConfirm === 'function' && opts.onConfirm(e)
							},
						},
					],
				}, opts))
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