import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { $wuxBackdrop } from '../index'
import { defaults } from './utils'

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const content = classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--has-icon`]: true,
            })
            const icon = classNames(`${prefixCls}__icon`, {
                [`${prefixCls}__icon--loading`]: true,
            })
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
            this.$$setData({ in: false })
            this.$wuxBackdrop && this.$wuxBackdrop.release()
        },
        /**
         * 显示
         */
        show(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop && this.$wuxBackdrop.retain()
        },
    },
    created() {
        if (this.data.mask) {
            this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
        }
    },
})
