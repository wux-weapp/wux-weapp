import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'
import { $wuxBackdrop } from '../index'

const defaults = {
    type: 'success',
    duration: 1500,
    color: '#fff',
    text: '已完成',
    success() {},
}
const TOAST_TYPES = [{
        type: 'success',
        icon: 'success_no_circle',
        className: 'wux-toast__bd--success',
    },
    {
        type: 'cancel',
        icon: 'cancel',
        className: 'wux-toast__bd--cancel',
    },
    {
        type: 'forbidden',
        icon: 'warn',
        className: 'wux-toast__bd--forbidden',
    },
    {
        type: 'text',
        icon: '',
        className: 'wux-toast__bd--text',
    },
]

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
            this.$wuxBackdrop.release()
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

                // 判断提示类型，显示对应的图标
                TOAST_TYPES.forEach((value) => {
                    if (value.type === opts.type) {
                        Object.assign(options, {
                            type: value.icon,
                            className: value.className,
                        })
                    }
                })

                this.$$setData({ in: true, ...options })
                this.$wuxBackdrop.retain()

                if (_toast) {
                    clearTimeout(_toast.timeout)
                    _toast = null
                }

                _toast = {
                    hide: this.hide,
                }

                _toast.timeout = setTimeout(callback, options.duration)
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
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})