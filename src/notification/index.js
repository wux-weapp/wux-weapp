import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const defaults = {
    prefixCls: 'wux-notification',
    classNames: 'wux-animate--slideInDown',
    image: '',
    title: '',
    text: '',
    duration: 3000,
    data: '',
    onClick() {},
    onClose() {},
}

let _notification = null

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes() {
            const { prefixCls } = this.data
            const wrap = classNames(prefixCls)
            const content = `${prefixCls}__content`
            const hd = `${prefixCls}__hd`
            const image = `${prefixCls}__image`
            const bd = `${prefixCls}__bd`
            const title = `${prefixCls}__title`
            const text = `${prefixCls}__text`
            const ft = `${prefixCls}__ft`

            return {
                wrap,
                content,
                hd,
                image,
                bd,
                title,
                text,
                ft,
            }
        },
    },
    methods: {
        /**
         * 隐藏
         */
        hide() {
            this.$$setData({ in: false })
            if (typeof this.fns.onClose === 'function') {
                this.fns.onClose(this.data.data)
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
                this.$$setData({ in: true, ...options })

                if (_notification) {
                    clearTimeout(_notification.timeout)
                    _notification = null
                }

                _notification = {
                    hide: this.hide,
                }

                _notification.timeout = setTimeout(callback, options.duration)
            })

            const result = () => {
                if (_notification) {
                    _notification.hide.call(this)
                }
            }

            result.then = (resolve, reject) => closePromise.then(resolve, reject)
            result.promise = closePromise

            return result
        },
        /**
         * 点击事件
         */
        onClick() {
            if (typeof this.fns.onClick === 'function') {
                this.fns.onClick(this.data.data)
            }
        },
    },
})
