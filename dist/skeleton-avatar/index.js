import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../skeleton/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-skeleton-avatar',
        },
        size: {
            type: String,
            value: 'default',
        },
        shape: {
            type: String,
            value: 'circle',
        },
    },
    data: {
        active: false,
    },
    computed: {
        classes() {
            const { prefixCls, active, size, shape } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--active`]: active,
                [`${prefixCls}--${size}`]: size,
                [`${prefixCls}--${shape}`]: shape,
            })

            return {
                wrap,
            }
        },
    },
    methods: {
    	updated(active) {
            if (this.data.active !== active) {
                this.setData({
                    active,
                })
            }
        },
    },
})
