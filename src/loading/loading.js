import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			text: `数据加载中`, 
		}
	},
	/**
	 * 显示loading组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.text 提示文本
	 */
	show(opts = {}) {
		const options = Object.assign({}, this.setDefaults(), opts)

    	// 实例化组件
    	this.component = new Component({
			scope: `$wux.loading`, 
			data: options, 
			methods: {
				/**
				 * 隐藏
				 */
				hide() {
					if (this.removed) return !1
					this.removed = !0
					this.setHidden()
				},
				/**
				 * 显示
				 */
				show() {
					if (this.removed) return !1
					this.setVisible()
				},
			},
		})

    	this.component.show()
	},
	/**
	 * 隐藏loading组件
	 */
	hide() {
		if (this.component) {
			this.component.hide()
		}
	},
}