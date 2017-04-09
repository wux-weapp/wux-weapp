import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			image: undefined, 
			title: undefined, 
			text: undefined, 
			timer: 3000, 
			data: undefined, 
			onClick() {}, 
			onClose() {}, 
		}
	},
	/**
	 * 显示notification组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.image 通知的图标
	 * @param {String} opts.title 通知的标题
	 * @param {String} opts.text 通知的文本
	 * @param {Number} opts.timer 多少毫秒后消失
	 * @param {Undefined|Null|Boolean|Number|String|Object} opts.data 自定义数据传给 onClick、onClose
	 * @param {Function} opts.onClick 点击后的回调函数
	 * @param {Function} opts.onClose 消失后的回调函数
	 */
	show(opts = {}) {
		const that = this
		const options = Object.assign({
			style: ``
		}, this.setDefaults(), opts)

		const getTouchPosition = (e) => {
			const touches = e.touches[0]
			return {
				x: touches.pageX, 
				y: touches.pageY, 
			}
		}

		const setStyle = (vm, diff = 0) => {
			vm.setData({
				[`$wux.notification.style`]: diff ? `transform: translate3d(0, ${diff}px, 0)` : ``, 
			})
		}

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.notification`, 
    		data: options, 
    		methods: {
    			/**
	    		 * 隐藏
	    		 */
    			hide() {
					if (this.removed) return !1
					this.removed = !0
					this.setHidden(`notification-out`, 400)
					typeof options.onClose === `function` && options.onClose(options.data)
				},
				/**
				 * 显示
				 */
				show() {
					if (this.removed) return !1
					this.setVisible(`notification-in`)
				},
				/**
				 * 手指触摸动作开始
				 */
				bindtouchstart(e) {
					that.touching = !0
					this.start = getTouchPosition(e)
					this.diffX = this.diffY = 0
				},
				/**
				 * 	手指触摸后移动
				 */
				bindtouchmove(e) {
					if(!this.start) return !1
					this.move = getTouchPosition(e)
					this.diffX = this.move.x - this.start.x
					this.diffY = this.move.y - this.start.y

					if(this.diffY > 0) {
						this.diffY = Math.sqrt(this.diffY)
					}

					setStyle(this, this.diffY)
				},
				/**
				 * 	手指触摸动作结束
				 */
				bindtouchend(e) {
					that.touching = !1
					setStyle(this)

					if(this.diffY < 0 && (Math.abs(this.diffY) > 40)) {
						this.hide()
					}

					if(Math.abs(this.diffX) <= 1 && Math.abs(this.diffY) <= 1) {
						typeof options.onClick === `function` && options.onClick(options.data)
					}

					this.start = !1
				},
				/**
				 * 手指触摸动作被打断，如来电提醒，弹窗
				 */
				touchcancel(e) {},
    		},
    	})

		const startTimeout = () => {
	    	if(this._notification){
				clearTimeout(this._notification.timeout)
				this._notification = null
			}

			that._notification = {
				hide: component.hide, 
			}

			that._notification.timeout = setTimeout(() => {
				that.touching ? startTimeout() : component.hide()
			}, options.timer)
		}

		component.show()
		
		startTimeout()

		return that._notification.hide
	},
}