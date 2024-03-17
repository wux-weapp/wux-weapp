import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { defaults } from './utils'

let _toptips = null

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes: ['prefixCls, icon', function(prefixCls, iconType) {
            const ico = iconType ? iconType : 'cancel'
            const wrap = classNames(prefixCls)
            const content = classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--${ico}`]: ico,
            })
            const icon = `${prefixCls}__icon`
            const text = `${prefixCls}__text`

            return {
                wrap,
                content,
                icon,
                text,
            }
        }],
    },
    methods: {
        /**
         * 隐藏
         */
        hide() {
            if (this.removed) return false
            this.removed = true
            if (_toptips) {
                clearTimeout(_toptips.timeout)
                _toptips = null
            }
            this.$$setData({ in: false })
            if (typeof this.fns.success === 'function') {
                this.fns.success()
            }
        },
        /**
         * 显示
         */
        show(opts = {}) {
            const closePromise = new Promise((resolve) => {
                const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
                const callback = () => {
                    this.hide()
                    return resolve(true)
                }
                this.removed = false
                this.$$setData({ in: true, ...options })

                if (_toptips) {
                    clearTimeout(_toptips.timeout)
                    _toptips = null
                }

                _toptips = {
                    hide: this.hide,
                }

                _toptips.timeout = setTimeout(callback, options.duration)
            })

            const result = () => {
                if (_toptips) {
                    _toptips.hide.call(this)
                }
            }

            result.then = (resolve, reject) => closePromise.then(resolve, reject)
            result.promise = closePromise

            return result
        },
        success(opts = {}) {
            return this.show(Object.assign({
                ...opts,
                icon: 'success',
            }))
        },
        info(opts = {}) {
            return this.show(Object.assign({
                ...opts,
                icon: 'info',
            }))
        },
        warn(opts = {}) {
            return this.show(Object.assign({
                ...opts,
                icon: 'warn',
            }))
        },
        error(opts = {}) {
            return this.show(Object.assign({
                ...opts,
                icon: 'cancel',
            }))
        },
    },
})
