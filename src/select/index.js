import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { getSelectIndex } from '../popup-select/utils'

const defaults = {
    prefixCls: 'wux-select',
    value: '',
    options: [],
    multiple: false,
    max: -1,
    toolbar: {
        title: '请选择',
        cancelText: '取消',
        confirmText: '确定',
    },
    onChange() {},
    onConfirm() {},
    onCancel() {},
}

function runCallbacks(method, values, vm) {
    const { value } = values
    const { options, multiple } = vm.data
    const index = getSelectIndex(options, value, multiple)
    if (typeof vm.fns[method] === 'function') {
        vm.fns[method].call(vm, value, index, options)
    }
}

baseComponent({
    useFunc: true,
    data: defaults,
    methods: {
        /**
         * 打开
         */
        open(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts, {
                max: parseInt(opts.max),
            }))
            this.$$setData({ visible: true, ...options })
        },
        /**
         * 关闭
         */
        close(callback) {
            this.select = this.select || this.selectComponent('#wux-popup-select')
            this.select && this.select.close(callback)
        },
        /**
         * 点击确定按钮时的回调函数
         */
        onConfirm(e) {
            return runCallbacks('onConfirm', e.detail, this)
        },
        /**
         * 点击取消按钮时的回调函数
         */
        onCancel(e) {
            return runCallbacks('onCancel', e.detail, this)
        },
        /**
         * 每列数据选择变化后的回调函数
         */
        onValueChange(e) {
            return runCallbacks('onChange', e.detail, this)
        },
        /**
         * 当显隐状态变化时回调函数
         */
        onVisibleChange(e) {
            this.$$setData({ visible: e.detail.visible })
        },
    },
})
