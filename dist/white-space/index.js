import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-whitespace',
        },
        size: {
            type: String,
            value: 'default',
        },
        bodyStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
    },
    data: {
        extStyle: '',
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
    methods: {
        onTap() {
            this.triggerEvent('click')
        },
    },
})
