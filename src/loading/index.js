import baseComponent from '../helpers/baseComponent'
import { $wuxBackdrop } from '../index'

const defaults = {
    text: '数据加载中',
    mask: true,
}

baseComponent({
    useFunc: true,
    data: defaults,
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
