import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-media',
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
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        align: {
            type: String,
            value: 'center',
        },
    },
    data: {
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, align', function(prefixCls, align) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--align-${align}`]: align,
            })
            const hd = `${prefixCls}__hd`
            const thumb = `${prefixCls}__thumb`
            const bd = `${prefixCls}__bd`
            const title = `${prefixCls}__title`
            const desc = `${prefixCls}__desc`

            return {
                wrap,
                hd,
                thumb,
                bd,
                title,
                desc,
            }
        }],
    },
})
