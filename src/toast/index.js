import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { $wuxBackdrop } from '../index'

const defaults = {
    prefixCls: 'wux-toast',
    classNames: 'wux-animate--fadeIn',
    type: 'default',
    duration: 1500,
    color: '#fff',
    text: '',
    icon: '',
    mask: true,
    transparent: true,
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

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes() {
            const { prefixCls, icon: hasIcon } = this.data
            const wrap = classNames(prefixCls)
            const content = classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--has-icon`]: hasIcon,
            })
            const icon = `${prefixCls}__icon`
            const text = `${prefixCls}__text`

            return {
                wrap,
                content,
                icon,
                text,
            }
        },
    },
    methods: {
        /**
         * 隐藏
         */
        hide() {
            if (this.removed) return false
            this.removed = true
            if (_toast) {
                clearTimeout(_toast.timeout)
                _toast = null
            }
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

                this.removed = false
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
