import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'

const defaults = {
    icon: 'cancel',
    hidden: false,
    text: '',
    duration: 3000,
    className: '',
    success() {},
}

let _toptips = null

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
            if (typeof this.fns.success === 'function') {
                this.fns.success()
            }
        },
        /**
         * 显示
         */
        show(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.$$setData({ in: true, ...options })

            if (_toptips) {
                clearTimeout(_toptips.timeout)
                _toptips = null
            }

            _toptips = {
                hide: this.hide,
            }

            _toptips.timeout = setTimeout(() => this.hide(), options.duration)

            return _toptips.hide.bind(this)
        },
        success(opts = {}) {
            return this.show(Object.assign({
                icon: 'success',
            }, opts))
        },
        info(opts = {}) {
            return this.show(Object.assign({
                icon: 'info',
            }, opts))
        },
        warn(opts = {}) {
            return this.show(Object.assign({
                icon: 'warn',
            }, opts))
        },
        error(opts = {}) {
            return this.show(Object.assign({
                icon: 'cancel',
            }, opts))
        },
    },
})