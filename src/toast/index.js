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

let timeout = null

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
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))

            // 判断提示类型，显示对应的图标
            TOAST_TYPES.forEach((value, key) => {
                if (value.type === opts.type) {
                    options.type = value.icon
                    options.className = value.className
                }
            })

            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop.retain()

            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }

            setTimeout(() => this.hide(), this.data.duration)
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})