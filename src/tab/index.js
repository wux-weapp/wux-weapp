import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { getDefaultContext } from '../helpers/shared/getDefaultContext'
import { useRect } from '../helpers/hooks/useDOM'
import { props as tabsProps } from '../tabs/props'

const defaultContext = getDefaultContext(tabsProps, [
    'scroll',
    'theme',
    'direction',
    'activeLineMode',
])

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
        context: defaultContext,
    },
    computed: {
        classes: ['prefixCls, disabled, current, context', function(prefixCls, disabled, current, context) {
            const { direction, scroll, theme, activeLineMode } = context
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${direction}`]: direction,
                [`${prefixCls}--${theme}`]: theme,
                [`${prefixCls}--scroll`]: scroll,
                [`${prefixCls}--current`]: current,
                [`${prefixCls}--disabled`]: disabled,
            })
            const title = `${prefixCls}-title`
            const bar = classNames(`${prefixCls}-bar`, {
                [`${prefixCls}-bar--${activeLineMode}`]: activeLineMode,
            })

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
                useRect(`.${prefixCls}`, this)
                    .then((activeTab) => {
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
            })
        },
        changeCurrent({ current, context = defaultContext }) {
            this.setData({
                current,
                context,
            })
        },
        onTap() {
            const { key, disabled } = this.data
            const parent = this.getRelationsByName('../tabs/index')[0]

            if (disabled || !parent) return

            this.triggerEvent('click', { key })

            parent.setActiveKey(key)
        },
    },
})
