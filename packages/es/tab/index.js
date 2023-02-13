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
        classes: ['prefixCls, direction, scroll, theme, current, disabled', function(prefixCls, direction, scroll, theme, current, disabled) {
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
        }],
    },
    methods: {
        activeTabRef() {
            return new Promise((resolve) => {
                const { prefixCls } = this.data
                const query = wx.createSelectorQuery().in(this)
                query.select(`.${prefixCls}`).boundingClientRect((activeTab) => {
                    const activeTabLeft = activeTab.left
                    const activeTabWidth = activeTab.width
                    const activeTabTop = activeTab.top
                    const activeTabHeight = activeTab.height
                    resolve({
                        activeTabLeft,
                        activeTabWidth,
                        activeTabTop,
                        activeTabHeight,
                    })
                })
                query.exec()
            })
        },
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
