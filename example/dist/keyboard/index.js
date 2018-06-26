import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'
import { $wuxBackdrop } from '../index'

const defaults = {
    className: '',
    titleText: '安全键盘',
    cancelText: '取消',
    inputText: '输入数字密码',
    showCancel: true,
    disorder: false,
    callback(value) {},
}

/**
 * 给指一位数组随机生成二维数组
 * 
 * @param {boolean} [isRandom=false] 是否随机
 * @param {array} [arr=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]] 默认数组
 * @returns 
 */
const upsetNums = (isRandom = false, arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) => {
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
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        /**
         * 隐藏
         */
        hide() {
            this.$$setData({ in: false })
            this.$wuxBackdrop.release()
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
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({
                nums: upsetNums(opts.disorder),
                keys: [1, 2, 3, 4, 5, 6],
                value: '',
            }, defaults, opts))

            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop.retain()

            return this.hide.bind(this)
        },
        /**
         * 增加
         */
        increase(e) {
            const dataset = e.currentTarget.dataset
            const value = String(dataset.value)
            const keyboard = this.data
            const length = keyboard.value.length
            const callback = () => {
                if (length === 5) {
                    const preCloseCallback = this.fns.callback
                    const performCloseDialog = () => {
                        this.updateValue()
                        this.hide()
                    }

                    if (preCloseCallback && typeof preCloseCallback === `function`) {
                        const preCloseCallbackResult = preCloseCallback.call(this, keyboard.value)
                        if (typeof preCloseCallbackResult === 'object') {
                            if (preCloseCallbackResult.closePromise) {
                                preCloseCallbackResult.closePromise.then(performCloseDialog, this.updateValue)
                            } else {
                                preCloseCallbackResult.then(performCloseDialog, this.updateValue)
                            }
                        } else if (preCloseCallbackResult !== false) {
                            performCloseDialog()
                        } else {
                            this.updateValue()
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
            const keyboard = this.data
            const length = keyboard.value.length

            if (length === 0) {
                return false
            }

            this.updateValue(keyboard.value.substr(0, length - 1))
        },
        /**
         * 更新
         */
        updateValue(value = '', callback = () => {}) {
            this.$$setData({ value }).then(() => this.$$requestAnimationFrame(callback))
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})