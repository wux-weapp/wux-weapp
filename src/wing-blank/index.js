import baseComponent from '../helpers/baseComponent'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-wingblank',
        },
        size: {
            type: String,
            value: 'default',
        },
        bodyStyle: {
            type: String,
            value: '',
        },
    },
    computed: {
        classes() {
            const { prefixCls, size } = this.data
            const wrap = this.classNames(prefixCls, {
                [`${prefixCls}--${size}`]: size,
            })

            return {
                wrap,
            }
        },
    },
})
