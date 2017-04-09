import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			title: undefined, 
			content: undefined, 
			buttons: [], 
			verticalButtons: !1, 
		}
	},
	/**
	 * 默认数据
	 */
	data() {
		return {
			onCancel() {}, 
        	cancelText: `取消`, 
        	cancelType: `weui-dialog__btn_default`, 
        	onConfirm() {}, 
        	confirmText: `确定`, 
        	confirmType: `weui-dialog__btn_primary`, 
        }
	},
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {String} opts.content 提示文本
	 * @param {Boolean} opts.verticalButtons 是否显示垂直按钮布局
	 * @param {Array} opts.buttons 按钮
	 * @param {String} opts.buttons.text 按钮的文字
	 * @param {String} opts.buttons.type 按钮的类型
	 * @param {Boolean} opts.buttons.bold 是否加粗按钮的文字
	 * @param {Function} opts.buttons.onTap 按钮的点击事件
	 */
	open(opts = {}) {
		const options = Object.assign({
			animateCss: undefined, 
            visible: !1, 
		}, this.setDefaults(), opts)

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.dialog`, 
    		data: options, 
    		methods: {
    			/**
    			 * 隐藏
    			 */
    			hide(cb) {
					if (this.removed) return !1
					this.removed = !0
					this.setHidden()
					setTimeout(() => typeof cb === `function` && cb(), 300)
				},
				/**
				 * 显示
				 */
				show() {
					if (this.removed) return !1
					this.setVisible()
				},
				/**
				 * 按钮点击事件
				 */
				buttonTapped(e) {
					const index = e.currentTarget.dataset.index
					const button = options.buttons[index]
					this.hide(() => typeof button.onTap === `function` && button.onTap(e))
				},
				/**
				 * 当键盘输入时，触发 input 事件
				 */
				bindinput(e) {
					this.setData({
						[`$wux.dialog.prompt.response`]: e.detail.value, 
					})
				},
    		},
    	})

		component.show()

		return component.hide
	},
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.title 提示标题
	 * @param {String} opts.content 提示文本
	 * @param {String} opts.confirmText 确定按钮的文字，默认为"确定"
	 * @param {String} opts.confirmType 确定按钮的类型
	 * @param {Function} opts.onConfirm 确定按钮的点击事件
	 */
	alert(opts = {}) {
		return this.open(Object.assign({
			buttons: [
				{
					text: opts.confirmText || this.data().confirmText, 
					type: opts.confirmType || this.data().confirmType, 
					onTap(e) {
						typeof opts.onConfirm === `function` && opts.onConfirm(e)
					},
				},
			],
		}, opts))
	},
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
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
		return this.open(Object.assign({
			buttons: [
				{
					text: opts.cancelText || this.data().cancelText, 
					type: opts.cancelType || this.data().cancelType, 
					onTap(e) { 
						typeof opts.onCancel === `function` && opts.onCancel(e)
					},
				},
				{
					text: opts.confirmText || this.data().confirmText, 
					type: opts.confirmType || this.data().confirmType, 
					onTap(e) { 
						typeof opts.onConfirm === `function` && opts.onConfirm(e)
					},
				},
			],
		}, opts))
	},
	/**
	 * 显示dialog组件
	 * @param {Object} opts 配置项
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
			fieldtype: opts.fieldtype ? opts.fieldtype : `text`, 
			password: !!opts.password, 
			response: opts.defaultText ? opts.defaultText : ``, 
			placeholder: opts.placeholder ? opts.placeholder : ``, 
			maxlength: opts.maxlength ? parseInt(opts.maxlength) : ``, 
		}

		return this.open(Object.assign({
			prompt: prompt, 
			buttons: [
				{
					text: opts.cancelText || this.data().cancelText, 
					type: opts.cancelType || this.data().cancelType, 
					onTap(e) { 
						typeof opts.onCancel === `function` && opts.onCancel(e)
					},
				},
				{
					text: opts.confirmText || this.data().confirmText, 
					type: opts.confirmType || this.data().confirmType, 
					onTap(e) { 
						typeof opts.onConfirm === `function` && opts.onConfirm(e)
					},
				},
			],
		}, opts))
	},
}