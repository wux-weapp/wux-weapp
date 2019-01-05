import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../tabs/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-tabs__tab',
        },
        key: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        current: false,
        scroll: false,
    },
    computed: {
        classes() {
            const { prefixCls, direction, scroll, theme, current, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${direction}`]: direction,
                [`${prefixCls}--${theme}`]: theme,
                [`${prefixCls}--scroll`]: scroll,
                [`${prefixCls}--current`]: current,
                [`${prefixCls}--disabled`]: disabled,
            })
            const title = `${prefixCls}-title`
            const bar = `${prefixCls}-bar`

            return {
                wrap,
                title,
                bar,
            }
        },
    },
    methods: {
        changeCurrent({ current, scroll, theme, direction }) {
            this.setData({
                current,
                scroll,
                theme,
                direction,
            })
        },
        onTap() {
            const { key, disabled } = this.data
            const parent = this.getRelationNodes('../tabs/index')[0]

            if (disabled || !parent) return

            this.triggerEvent('click', { key })

            parent.setActiveKey(key)
        },
    },
})