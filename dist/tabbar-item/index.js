import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../tabbar/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-tabbar-item',
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
        width: '100%',
        current: false,
        index: '0',
    },
    computed: {
        classes() {
            const { prefixCls, theme, current, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
                [`${prefixCls}--current`]: current,
                [`${prefixCls}--disabled`]: disabled,
            })
            const icon = `${prefixCls}__icon`
            const title = `${prefixCls}__title`

            return {
                wrap,
                icon,
                title,
            }
        },
    },
    methods: {
        changeCurrent(current, index, theme, length) {
            const width = 100 / length + '%'

            this.setData({
                width,
                current,
                theme,
                index,
            })
        },
        onTap() {
            const { index, disabled } = this.data
            const parent = this.getRelationNodes('../tabbar/index')[0]

            if (disabled || !parent) {
                return false
            }

            this.triggerEvent('click', { index })

            parent.setActiveKey(index)
        },
    },
})