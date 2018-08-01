import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'

const defaults = {
    image: '',
    title: '',
    text: '',
    duration: 3000,
    data: '',
    onClick() {},
    onClose() {},
}

let _notification = null

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