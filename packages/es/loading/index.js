import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { $wuxBackdrop } from '../index'

const defaults = {
    prefixCls: 'wux-loading',
    classNames: 'wux-animate--fadeIn',
    text: '数据加载中',
    mask: true,
    transparent: true,
}

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
