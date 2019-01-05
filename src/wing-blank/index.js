import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

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
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${size}`]: size,
            })

            return {
                wrap,
            }
        },
    },
})
