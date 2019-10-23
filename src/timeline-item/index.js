import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    relations: {
        '../timeline/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-timeline-item',
        },
        content: {
            type: String,
            value: '',
        },
        dotStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        custom: {
            type: Boolean,
            value: false,
        },
        position: {
            type: String,
            value: ''
        }
    },
    data: {
        isLast: false,
        isPending: false,
        pending: false,
        className: '',
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, isLast, pending, isPending, custom', function(prefixCls, isLast, pending, isPending, custom) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--last`]: isLast,
                [`${prefixCls}--pending`]: pending,
            })
            const tail = classNames(`${prefixCls}__tail`, {
                [`${prefixCls}__tail--pending`]: isPending,
            })
            const dot = classNames(`${prefixCls}__dot`, {
                [`${prefixCls}__dot--custom`]: custom,
            })
            const content = `${prefixCls}__content`

            return {
                wrap,
                tail,
                dot,
                content,
            }
        }],
    },
    methods: {
    	updateIsLastElement({ index, isLast, isPending, pending, position }) {
            const { prefixCls } = this.data
            const className = position === 'alternate' ? this.data.position ? `wux-timeline-item--alternate wux-timeline-item--${this.data.position}` : index % 2 === 0 ? `${prefixCls}--alternate ${prefixCls}--left` : `${prefixCls}--alternate ${prefixCls}--right` : position === 'right' ? `${prefixCls}--right` : ''
            this.setData({ isLast, isPending, pending, className })
        },
    },
})
