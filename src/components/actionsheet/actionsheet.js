import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			className: undefined, 
	    	titleText: undefined, 
			buttons: [], 
			buttonClicked: function() {}, 
			cancelText: `取消`, 
			cancel: function() {}, 
			// destructiveText: '删除', 
			// destructiveButtonClicked: function() {}, 
		}
    },
	/**
	 * 上拉菜单组件
	 * @param {Object} opts 配置项
	 * @param {String} opts.className 自定义类名
	 * @param {String} opts.titleText 标题
	 * @param {Array} opts.buttons 按钮
	 * @param {Function} opts.buttonClicked 按钮点击事件
	 * @param {String} opts.cancelText 取消按钮的文本
	 * @param {Function} opts.cancel 取消按钮点击事件
	 * @param {String} opts.destructiveText 删除按钮的文本
	 * @param {Function} opts.destructiveButtonClicked 删除按钮点击事件
	 */
    show(opts = {}) {
    	const options = Object.assign({
            animateCss: undefined, 
            visible: !1, 
        }, this.setDefaults(), opts)

    	// 实例化组件
    	const component = new Component({
            scope: `$wux.actionSheet`, 
            data: options, 
            methods: {
                /**
                 * 隐藏
                 */
                removeSheet(callback) {
                    if (this.removed) return !1
                    this.removed = !0
                    this.setHidden([`weui-animate-slide-down`, `weui-animate-fade-out`])
                    typeof callback === `function` && callback(options.buttons)
                },
                /**
                 * 显示
                 */
                showSheet() {
                    if (this.removed) return !1
                    this.setVisible([`weui-animate-slide-up`, `weui-animate-fade-in`])
                },
                /**
                 * 按钮点击事件
                 */
                buttonClicked(e) {
                    const index = e.currentTarget.dataset.index
                    if (options.buttonClicked(index, options.buttons[index]) === true) {
                        this.removeSheet()
                    }
                },
                /**
                 * 删除按钮点击事件
                 */
                destructiveButtonClicked() {
                    if (options.destructiveButtonClicked() === true) {
                        this.removeSheet()
                    }
                },
                /**
                 * 取消按钮点击事件
                 */
                cancel() {
                    this.removeSheet(options.cancel)
                },
            },
        })

        component.showSheet()

    	return component.cancel
    },
}