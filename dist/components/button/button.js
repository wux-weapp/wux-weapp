import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
            className: undefined, 
            position: `bottomRight`, 
			backdrop: !1, 
			buttons: [], 
            buttonClicked() {}, 
			callback() {}, 
		}
    },
    /**
     * 默认数据
     */
    data() {
        return [
            {
                type: `topLeft`, 
                className: `wux-speed-dial--top-left`, 
            },
            {
                type: `topRight`, 
                className: `wux-speed-dial--top-right`, 
            },
            {
                type: `bottomLeft`, 
                className: `wux-speed-dial--bottom-left`, 
            },
            {
                type: `bottomRight`, 
                className: `wux-speed-dial--bottom-right`, 
            }
        ]
    },
	/**
	 * 浮动按钮组件
	 * @param {Object} opts 配置项
	 * @param {String} id   唯一标识
     * @param {String} opts.className 自定义类名
     * @param {String} opts.position 按钮的位置，可选值 topLeft、topRight、bottomLeft、bottomRight
	 * @param {Boolean} opts.backdrop 是否显示透明蒙层
	 * @param {Array} opts.buttons 按钮
     * @param {String} opts.buttons.className 按钮的类名
     * @param {String} opts.buttons.label 按钮的文字
     * @param {String} opts.buttons.icon 按钮的图标
     * @param {Function} opts.buttonClicked 按钮点击事件
	 * @param {Function} opts.callback 监听状态变化的回调函数
	 */
    init(id, opts = {}) {
    	const options = Object.assign({
            animateCss: undefined, 
            visible: !1, 
        }, this.setDefaults(), opts)

        const BUTTON_TYPES = this.data()
        
        // 判断提示类型，显示对应的位置
        BUTTON_TYPES.forEach((value, key) => {
            if (value.type === options.position) {
                options.className = options.className ? `${value.className} ${options.className}` : value.className
            }
        })

        // 切换状态
        const toggle = (vm, opened = !1) => {
            vm.setData({
                [`$wux.button.${id}.opened`]: opened
            })
            if (typeof options.callback === `function`) {
                options.callback(vm, opened)
            }
        }

    	// 实例化组件
    	const component = new Component({
            scope: `$wux.button.${id}`, 
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
                /**
                 * 关闭
                 */
                close () {
                    if (!this.opened) return !1
                    this.opened = !1
                    toggle(this, !1)
                },
                /**
                 * 打开
                 */
                open () {
                    if (this.opened) return !1
                    this.opened = !0
                    toggle(this, !0)
                },
                /**
                 * 按钮点击事件
                 */
                buttonClicked (e) {
                    const index = e.currentTarget.dataset.index
                    if (options.buttonClicked(index, options.buttons[index]) === true) {
                        this.close()
                    }
                },
                /**
                 * 切换状态
                 */
                toggle (e) {
                    !this.opened ? this.open() : this.close()
                },
            },
        })

        component.show()

    	return component
    },
}