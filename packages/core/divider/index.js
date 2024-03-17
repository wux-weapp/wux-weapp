import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-divider',
        },
        position: {
            type: String,
            value: 'center',
        },
        dashed: {
            type: Boolean,
            value: false,
        },
        text: {
            type: String,
            value: '',
        },
        showText: {
            type: Boolean,
            value: true,
        },
        direction: {
            type: String,
            value: 'horizontal',
        },
    },
    computed: {
        classes: ['prefixCls, dashed, showText, position, direction', function(prefixCls, dashed, showText, position, direction) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--dashed`]: dashed,
                [`${prefixCls}--text`]: showText,
                [`${prefixCls}--text-${position}`]: showText && position,
                [`${prefixCls}--${direction}`]: direction,
            })
            const text = `${prefixCls}__text`

            return {
                wrap,
                text,
            }
        }],
    },
})
