import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'
import { $wuxBackdrop } from '../index'

const defaults = {
    type: 'default',
    duration: 1500,
    color: '#fff',
    text: '',
    icon: '',
    mask: true,
    success() {},
}

const iconTypes = {
    success: 'ios-checkmark-circle-outline',
    cancel: 'ios-close-circle-outline',
    forbidden: 'ios-alert',
    text: '',
    'default': '',
}

let _toast = null

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
            this.$wuxBackdrop && this.$wuxBackdrop.release()
            if (typeof this.fns.success === 'function') {
                this.fns.success()
            }
        },
        /**
         * 显示
         */
        show(opts) {
            if (typeof opts === 'string') {
                opts = Object.assign({}, {
                    text: arguments[0],
                }, arguments[1])
            }

            const closePromise = new Promise((resolve) => {
                const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
                const iconType = iconTypes[options.type] || options.icon
                const callback = () => {
                    this.hide()
                    return resolve(true)
                }

                options.icon = iconType

                this.$$setData({ in: true, ...options })
                this.$wuxBackdrop && this.$wuxBackdrop.retain()

                if (_toast) {
                    clearTimeout(_toast.timeout)
                    _toast = null
                }

                _toast = {
                    hide: this.hide,
                }

                _toast.timeout = setTimeout(callback, Math.max(0, options.duration))
            })

            const result = () => {
                if (_toast) {
                    _toast.hide.call(this)
                }
            }

            result.then = (resolve, reject) => closePromise.then(resolve, reject)
            result.promise = closePromise

            return result
        },
        /**
         * 成功提示
         */
        success(opts) {
            if (typeof opts === 'string') {
                opts = Object.assign({}, {
                    text: arguments[0],
                }, arguments[1])
            }

            return this.show(Object.assign({
                type: 'success',
            }, opts))
        },
        /**
         * 警告提示
         */
        warning(opts) {
            if (typeof opts === 'string') {
                opts = Object.assign({}, {
                    text: arguments[0],
                }, arguments[1])
            }

            return this.show(Object.assign({
                type: 'forbidden',
            }, opts))
        },
        /**
         * 错误提示
         */
        error(opts) {
            if (typeof opts === 'string') {
                opts = Object.assign({}, {
                    text: arguments[0],
                }, arguments[1])
            }

            return this.show(Object.assign({
                type: 'cancel',
            }, opts))
        },
        /**
         * 文本提示
         */
        info(opts) {
            if (typeof opts === 'string') {
                opts = Object.assign({}, {
                    text: arguments[0],
                }, arguments[1])
            }

            return this.show(Object.assign({
                type: 'text',
            }, opts))
        },
    },
    created() {
        if (this.data.mask) {
            this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
        }
    },
})