import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-navbar',
        },
        theme: {
            type: String,
            value: 'light',
        },
        title: {
            type: String,
            value: '',
        },
        leftText: {
            type: String,
            value: '',
        },
        rightText: {
            type: String,
            value: '',
        },
    },
    computed: {
        classes: ['prefixCls, theme', function(prefixCls, theme) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            })
            const left = `${prefixCls}__left`
            const text = `${prefixCls}__text`
            const title = `${prefixCls}__title`
            const right = `${prefixCls}__right`

            return {
                wrap,
                left,
                text,
                title,
                right,
            }
        }],
    },
    methods: {
        onClick(e) {
            const { type } = e.currentTarget.dataset
            this.triggerEvent('click', { type })
        },
    },
})
