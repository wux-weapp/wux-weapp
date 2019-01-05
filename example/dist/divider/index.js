import baseComponent from '../helpers/baseComponent'

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
    },
    computed: {
        classes() {
            const { prefixCls, dashed, showText, position } = this.data
            const wrap = this.classNames(prefixCls, {
                [`${prefixCls}--dashed`]: dashed,
                [`${prefixCls}--text`]: showText,
                [`${prefixCls}--text-${position}`]: showText && position,
            })
            const text = `${prefixCls}__text`

            return {
                wrap,
                text,
            }
        },
    },
})