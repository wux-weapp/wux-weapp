import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'
import { $wuxBackdrop } from '../index'

const defaults = {
    value: '',
    options: [],
    multiple: false,
    toolbar: {
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
    },
    onConfirm() {},
    onCancel() {},
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        open(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop.retain()
        },
        close(callback) {
            this.$$setData({ in: false })
            this.$wuxBackdrop.release()
            if (typeof callback === 'function') {
                callback(this.data.value)
            }
        },
        onConfirm() {
            this.close(this.fns.onConfirm)
        },
        onCancel() {
            this.close(this.fns.onCancel)
        },
        onCheckboxChange(e) {
            const oldValue = this.data.value
            const value = e.detail.value

            this.setData({
                value: value && !oldValue.includes(value) ? [...oldValue, value] : oldValue.filter((n) => n !== value),
            })
        },
        onRadioChange(e) {
            this.setData({
                value: e.detail.value,
            })
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})