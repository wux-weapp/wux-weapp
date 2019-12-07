import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-landscape',
        },
        visible: {
            type: Boolean,
            value: false,
        },
        mask: {
            type: Boolean,
            value: true,
            observer(newVal) {
                this.setData({ showMask: newVal })
            },
        },
        maskClosable: {
            type: Boolean,
            value: false,
        },
        closable: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        showMask: true,
    },
    computed: {
        classes: ['prefixCls, showMask', function(prefixCls, showMask) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--has-mask`]: showMask,
            })
            const popup = `${prefixCls}__popup`
            const popupBody = `${prefixCls}__popup-body`
            const popupClose = `${prefixCls}__popup-close`
            const inner = `${prefixCls}__inner`
            const close = `${prefixCls}__close`
            const x = `${prefixCls}__close-x`

            return {
                wrap,
                popup,
                popupBody,
                popupClose,
                inner,
                close,
                x,
            }
        }],
    },
    methods: {
        onClose() {
            this.triggerEvent('close', { visible: !this.data.visible })
        },
    },
    attached() {},
})
