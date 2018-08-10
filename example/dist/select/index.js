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

const getSelectIndex = ({ value = '', options = [], multiple = false }) => {
    const origins = options.map((n) => n.value || n)

    if (!multiple) {
        return origins.indexOf(value)
    }

    return (value || []).map((n) => origins.indexOf(n))
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        open(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            const index = getSelectIndex(options)

            this.$$setData({ in: true, ...options, index })
            this.$wuxBackdrop.retain()
        },
        close(callback) {
            this.$$setData({ in: false })
            this.$wuxBackdrop.release()

            if (typeof callback === 'function') {
                const { value, index, options } = this.data
                callback.call(this, value, index, options)
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
            const { value: newValue, checked } = e.detail
            const value = checked ? [...oldValue, newValue] : oldValue.filter((n) => n !== newValue)
            const index = getSelectIndex({ ...this.data, value })

            this.$$setData({
                value,
                index,
            })
        },
        onRadioChange(e) {
            const { value, index } = e.detail

            this.$$setData({
                value,
                index,
            })
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})