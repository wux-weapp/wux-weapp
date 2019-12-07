import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-button',
        },
        type: {
            type: String,
            value: 'stable',
        },
        clear: {
            type: Boolean,
            value: false,
        },
        block: {
            type: Boolean,
            value: false,
        },
        full: {
            type: Boolean,
            value: false,
        },
        outline: {
            type: Boolean,
            value: false,
        },
        bordered: {
            type: Boolean,
            value: true,
        },
        size: {
            type: String,
            value: 'default',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        formType: {
            type: String,
            value: '',
        },
        openType: {
            type: String,
            value: '',
        },
        hoverClass: {
            type: String,
            value: 'default',
        },
        hoverStopPropagation: {
            type: Boolean,
            value: false,
        },
        hoverStartTime: {
            type: Number,
            value: 20,
        },
        hoverStayTime: {
            type: Number,
            value: 70,
        },
        lang: {
            type: String,
            value: 'en',
        },
        sessionFrom: {
            type: String,
            value: '',
        },
        sendMessageTitle: {
            type: String,
            value: '',
        },
        sendMessagePath: {
            type: String,
            value: '',
        },
        sendMessageImg: {
            type: String,
            value: '',
        },
        showMessageCard: {
            type: Boolean,
            value: false,
        },
        appParameter: {
            type: String,
            value: '',
        },
    },
    computed: {
        classes: ['prefixCls, hoverClass, type, size, block, full, clear, outline, bordered, disabled', function(prefixCls, hoverClass, type, size, block, full, clear, outline, bordered, disabled) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${type}`]: type,
                [`${prefixCls}--${size}`]: size,
                [`${prefixCls}--block`]: block,
                [`${prefixCls}--full`]: full,
                [`${prefixCls}--clear`]: clear,
                [`${prefixCls}--outline`]: outline,
                [`${prefixCls}--bordered`]: bordered,
                [`${prefixCls}--disabled`]: disabled,
            })
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                hover,
            }
        }],
    },
    methods: {
        onTap() {
            if (!this.data.disabled && !this.data.loading) {
                this.triggerEvent('click')
            }
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', e.detail)
        },
        bindcontact(e) {
            this.triggerEvent('contact', e.detail)
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', e.detail)
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', e.detail)
        },
        onError(e) {
            this.triggerEvent('error', e.detail)
        },
    },
})
