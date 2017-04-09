import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			icon: `cancel`, 
			hidden: !1, 
			text: ``, 
			timer: 3000, 
			className: ``, 
			success() {}, 
		}
	},
	/**
	 * 显示toptips组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.icon 图标类型
	 * @param {Boolean} opts.hidden 是否隐藏图标
	 * @param {String} opts.text 报错文本
	 * @param {Number} opts.timer 多少毫秒后消失
	 * @param {String} opts.className 自定义类名
	 * @param {Function} opts.success 消失后的回调函数
	 */
	show(opts = {}) {
		const options = Object.assign({}, this.setDefaults(), opts)

    	if(this._toptips){
			clearTimeout(this._toptips.timeout)
			this._toptips = null
		}

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.toptips`, 
    		data: options, 
    		methods: {
    			/**
	    		 * 隐藏
	    		 */
    			hide() {
					if (this.removed) return !1
					this.removed = !0
					this.setHidden(`weui-animate-notify-upout`)
					typeof options.success === `function` && options.success()
				},
				/**
				 * 显示
				 */
				show() {
					if (this.removed) return !1
					this.setVisible(`weui-animate-notify-downin`)
				},
    		},
    	})

    	this._toptips = {
			hide: component.hide, 
		}

		this._toptips.timeout = setTimeout(component.hide, options.timer)

		component.show()

		return this._toptips.hide
	},
	success(opts = {}) {
		return this.show(Object.assign({
			icon: `success`, 
		}, opts))
	},
	info(opts = {}) {
		return this.show(Object.assign({
			icon: `info`, 
		}, opts))
	},
	warn(opts = {}) {
		return this.show(Object.assign({
			icon: `warn`, 
		}, opts))
	},
	error(opts = {}) {
		return this.show(Object.assign({
			icon: `cancel`, 
		}, opts))
	},
}