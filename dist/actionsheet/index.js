import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'
import { $wuxBackdrop } from '../index'

const defaults = {
    theme: 'ios',
    className: '',
    titleText: '',
    buttons: [],
    buttonClicked() {},
    cancelText: '取消',
    cancel() {},
    // destructiveText: '删除', 
    // destructiveButtonClicked() {}, 
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        /**
         * 显示
         */
        showSheet(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.removed = false
            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop.retain()
            return this.cancel.bind(this)
        },
        /**
         * 隐藏
         */
        removeSheet(callback) {
            if (this.removed) return false
            this.removed = true
            this.$$setData({ in: false })
            this.$wuxBackdrop.release()
            if (typeof callback === 'function') {
                callback(this.data.buttons)
            }
        },
        /**
         * 按钮点击事件
         */
        buttonClicked(e) {
            const { index } = e.currentTarget.dataset
            if (this.fns.buttonClicked(index, this.data.buttons[index]) === true) {
                this.removeSheet()
            }
        },
        /**
         * 删除按钮点击事件
         */
        destructiveButtonClicked() {
            if (this.fns.destructiveButtonClicked() === true) {
                this.removeSheet()
            }
        },
        /**
         * 取消按钮点击事件
         */
        cancel() {
            this.removeSheet(this.fns.cancel)
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})