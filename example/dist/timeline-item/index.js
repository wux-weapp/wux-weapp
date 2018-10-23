const prefixCls = 'wux-timeline-item'

Component({
	externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    relations: {
        '../timeline/index': {
            type: 'parent',
        },
    },
    data: {
        isLast: false,
        isPending: false,
        pending: false,
        className: '',
    },
    properties: {
        content: {
            type: String,
            value: '',
        },
        dotStyle: {
            type: String,
            value: '',
        },
        custom: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
    	updateIsLastElement({ index, isLast, isPending, pending, position }) {
            const className = position === 'alternate' ? index % 2 === 0 ? `${prefixCls}--alternate ${prefixCls}--left` : `${prefixCls}--alternate ${prefixCls}--right` : position === 'right' ? `${prefixCls}--right` : ''
            this.setData({ isLast, isPending, pending, className })
        },
    },
})