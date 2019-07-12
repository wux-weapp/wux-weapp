import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-card',
        },
        bordered: {
            type: Boolean,
            value: true,
        },
        full: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        thumbStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        extra: {
            type: String,
            value: '',
        },
        actions: {
            type: Array,
            value: [],
        },
    },
    data: {
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, bordered, full, actions', function(prefixCls, bordered, full, _actions) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--bordered`]: bordered,
                [`${prefixCls}--full`]: full,
                [`${prefixCls}--has-actions`]: _actions.length > 0,
            })
            const hd = `${prefixCls}__hd`
            const content = `${prefixCls}__content`
            const thumb = `${prefixCls}__thumb`
            const extra = `${prefixCls}__extra`
            const bd = `${prefixCls}__bd`
            const ft = `${prefixCls}__ft`
            const actions = `${prefixCls}__actions`
            const action = _actions.map((action) => {
                const wrap = classNames(`${prefixCls}__action`, {
                    [`${prefixCls}__action--${action.type || 'default'}`]: action.type || 'default',
                    [`${prefixCls}__action--bold`]: action.bold,
                    [`${prefixCls}__action--disabled`]: action.disabled,
                    [`${action.className}`]: action.className,
                })
                const hover = action.hoverClass && action.hoverClass !== 'default' ? action.hoverClass : `${prefixCls}__action--hover`

                return {
                    wrap,
                    hover,
                }
            })

            return {
                wrap,
                hd,
                content,
                thumb,
                extra,
                bd,
                ft,
                actions,
                action,
            }
        }],
    },
    methods: {
        onAction(e) {
            const { index } = e.currentTarget.dataset
            const { actions } = this.data
            const action = actions[index]

            if (!action.disabled) {
                this.triggerEvent('action', { index, action, actions })
            }
        },
    },
})
