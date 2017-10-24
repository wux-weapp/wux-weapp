import Component from '../component'

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            className: undefined,
            titleText: '安全键盘',
            cancelText: '取消',
            inputText: '输入数字密码',
            showCancel: true,
            disorder: false,
            callback(value) {},
        }
    },
    /**
     * 给指一位数组随机生成二维数组
     * 
     * @param {boolean} [isRandom=false] 是否随机
     * @param {array} [arr=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]] 默认数组
     * @returns 
     */
    upsetNums(isRandom = false, arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) {
        if (isRandom) {
            const floor = Math.floor
            const random = Math.random
            const len = arr.length
            let i, j, temp, n = floor(len / 2) + 1
            while (n--) {
                i = floor(random() * len)
                j = floor(random() * len)
                if (i !== j) {
                    temp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = temp
                }
            }
        }

        let nums = []

        for (let i = 0; i < 4; i++) {
            nums.push(arr.slice(i * 3, (i + 1) * 3))
        }

        return nums
    },
    /**
     * 上拉键盘组件
     * @param {Object} opts 配置项
     * @param {String} opts.className 自定义类名
     * @param {String} opts.titleText 标题
     * @param {String} opts.cancelText 取消按钮的文字
     * @param {String} opts.inputText 提示文本
     * @param {Boolean} opts.showCancel 是否显示取消按钮
     * @param {Boolean} opts.disorder 是否打乱键盘
     * @param {Function} opts.callback 输入完成后的回调函数
     */
    show(opts = {}) {
        const options = Object.assign({
            animateCss: undefined,
            visible: !1,
            nums: this.upsetNums(opts.disorder),
            keys: [1, 2, 3, 4, 5, 6],
            value: '',
        }, this.setDefaults(), opts)

        // 实例化组件
        const component = new Component({
            scope: `$wux.keyboard`,
            data: options,
            methods: {
                /**
                 * 隐藏
                 */
                hide() {
                    if (this.removed) return !1
                    this.removed = !0
                    this.setHidden([`weui-animate-slide-down`, `weui-animate-fade-out`])
                },
                /**
                 * 显示
                 */
                show() {
                    if (this.removed) return !1
                    this.setVisible([`weui-animate-slide-up`, `weui-animate-fade-in`])
                },
                /**
                 * 增加
                 */
                increase(e) {
                    const dataset = e.currentTarget.dataset
                    const value = String(dataset.value)
                    const keyboard = this.getComponentData()
                    const length = keyboard.value.length
                    const callback = () => {
                        if (length === 5) {
                            const preCloseCallback = options.callback
                            const updateValue = this.updateValue
                            const performCloseDialog = () => {
                                this.updateValue()
                                this.hide()
                            }

                            if (preCloseCallback && typeof preCloseCallback === `function`) {
                                const preCloseCallbackResult = preCloseCallback.call(this, keyboard.value)
                                if (typeof preCloseCallbackResult === 'object') {
                                    if (preCloseCallbackResult.closePromise) {
                                        preCloseCallbackResult.closePromise.then(performCloseDialog, () => updateValue())
                                    } else {
                                        preCloseCallbackResult.then(performCloseDialog, () => updateValue())
                                    }
                                } else if (preCloseCallbackResult !== false) {
                                    performCloseDialog()
                                } else {
                                    updateValue()
                                }
                            } else {
                                performCloseDialog()
                            }
                        }
                    }

                    if (length >= 6) {
                        return false
                    }

                    this.updateValue(keyboard.value + value, callback)
                },
                /**
                 * 减少
                 */
                decrease(e) {
                    const dataset = e.currentTarget.dataset
                    const value = String(dataset.value)
                    const keyboard = this.getComponentData()
                    const length = keyboard.value.length

                    if (length === 0) {
                        return false
                    }

                    this.updateValue(keyboard.value.substr(0, length - 1))
                },
                /**
                 * 更新
                 */
                updateValue(value = '', callback) {
                    this.setData({
                        [`$wux.keyboard.value`]: value,
                    }, callback)
                },
            },
        })

        component.show()

        return component
    },
}