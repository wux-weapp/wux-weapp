import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

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
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
    },
    computed: {
        classes() {
            const { prefixCls, bordered, full } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--bordered`]: bordered,
                [`${prefixCls}--full`]: full,
            })
            const hd = `${prefixCls}__hd`
            const content = `${prefixCls}__content`
            const thumb = `${prefixCls}__thumb`
            const extra = `${prefixCls}__extra`
            const bd = `${prefixCls}__bd`
            const ft = `${prefixCls}__ft`

            return {
                wrap,
                hd,
                content,
                thumb,
                extra,
                bd,
                ft,
            }
        },
    },
})