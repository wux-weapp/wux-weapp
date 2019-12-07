import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-spin',
        },
        classNames: {
            type: null,
            value: 'wux-animate--fadeIn',
        },
        tip: {
            type: String,
            value: '',
        },
        size: {
            type: String,
            value: 'default',
        },
        spinning: {
            type: Boolean,
            value: true,
            observer: 'updated',
        },
        nested: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        spinVisible: true,
    },
    computed: {
        classes: ['prefixCls, size, nested, tip, spinVisible', function(prefixCls, size, nested, showText, spinVisible) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${size}`]: size,
                [`${prefixCls}--nested`]: nested,
                [`${prefixCls}--show-text`]: showText,
            })
            const anim = !nested ? `${prefixCls}__spinning` : `${prefixCls}__spinning--nested`
            const dots = `${prefixCls}__dots`
            const dot = `${prefixCls}__dot`
            const tip = `${prefixCls}__tip`
            const container = classNames(`${prefixCls}__container`, {
                [`${prefixCls}__container--blur`]: spinVisible,
            })

            return {
                wrap,
                anim,
                dots,
                dot,
                tip,
                container,
            }
        }],
    },
    methods: {
        updated(spinVisible) {
            if (this.data.nested) {
                this.setData({
                    spinVisible,
                })
            }
        },
    },
})
