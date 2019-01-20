import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

const getPlacements = ([a, s, b] = rects, placement = 'top') => {
    switch (placement) {
        case 'topLeft':
            return {
                top: s.scrollTop + a.top - b.height - 4,
                left: s.scrollLeft + a.left,
            }
        case 'top':
            return {
                top: s.scrollTop + a.top - b.height - 4,
                left: s.scrollLeft + a.left + (a.width - b.width) / 2,
            }
        case 'topRight':
            return {
                top: s.scrollTop + a.top - b.height - 4,
                left: s.scrollLeft + a.left + a.width - b.width,
            }
        case 'rightTop':
            return {
                top: s.scrollTop + a.top,
                left: s.scrollLeft + a.left + a.width + 4,
            }
        case 'right':
            return {
                top: s.scrollTop + a.top + (a.height - b.height) / 2,
                left: s.scrollLeft + a.left + a.width + 4,
            }
        case 'rightBottom':
            return {
                top: s.scrollTop + a.top + a.height - b.height,
                left: s.scrollLeft + a.left + a.width + 4,
            }
        case 'bottomRight':
            return {
                top: s.scrollTop + a.top + a.height + 4,
                left: s.scrollLeft + a.left + a.width - b.width,
            }
        case 'bottom':
            return {
                top: s.scrollTop + a.top + a.height + 4,
                left: s.scrollLeft + a.left + (a.width - b.width) / 2,
            }
        case 'bottomLeft':
            return {
                top: s.scrollTop + a.top + a.height + 4,
                left: s.scrollLeft + a.left,
            }
        case 'leftBottom':
            return {
                top: s.scrollTop + a.top + a.height - b.height,
                left: s.scrollLeft + a.left - b.width - 4,
            }
        case 'left':
            return {
                top: s.scrollTop + a.top + (a.height - b.height) / 2,
                left: s.scrollLeft + a.left - b.width - 4,
            }
        case 'leftTop':
            return {
                top: s.scrollTop + a.top,
                left: s.scrollLeft + a.left - b.width - 4,
            }
        default:
            return {
                left: 0,
                top: 0,
            }
    }
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-popover',
        },
        classNames: {
            type: null,
            value: 'wux-animate--fadeIn',
        },
        theme: {
            type: String,
            value: 'light',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        placement: {
            type: String,
            value: 'top',
        },
        trigger: {
            type: String,
            value: 'click',
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
        defaultVisible: {
            type: Boolean,
            value: false,
        },
        visible: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (this.data.controlled) {
                    this.setData({
                        popoverVisible: newVal,
                    })
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        extStyle: '',
        popoverStyle: '',
        popoverVisible: false,
    },
    computed: {
        classes() {
            const { prefixCls, theme, placement } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--theme-${theme}`]: theme,
                [`${prefixCls}--placement-${placement}`]: placement,
            })
            const content = `${prefixCls}__content`
            const arrow = `${prefixCls}__arrow`
            const inner = `${prefixCls}__inner`
            const title = `${prefixCls}__title`
            const innerContent = `${prefixCls}__inner-content`
            const element = `${prefixCls}__element`

            return {
                wrap,
                content,
                arrow,
                inner,
                title,
                innerContent,
                element,
            }
        },
    },
    methods: {
        getPopoverStyle() {
            const { prefixCls } = this.data
            const query = wx.createSelectorQuery().in(this)
            query.select(`.${prefixCls}__element`).boundingClientRect()
            query.selectViewport().scrollOffset()
            query.select(`.${prefixCls}`).boundingClientRect()
            query.exec((rects) => {
                if (rects.filter((n) => !n).length) return

                const placements = getPlacements(rects, this.data.placement)

                this.setData({
                    popoverStyle: styleToCssString(placements),
                })
            })
        },
        /**
         * 当组件进入过渡的开始状态时，设置气泡框位置信息
         */
        onEnter() {
            this.getPopoverStyle()
        },
        fireEvents() {
            const { popoverVisible, controlled } = this.data
            const nextVisible = !popoverVisible

            if (!controlled) {
                this.setData({
                    popoverVisible: nextVisible,
                })
            }

            this.triggerEvent('change', { visible: nextVisible })
        },
        onClick() {
            if (this.data.trigger === 'click') {
                this.fireEvents()
            }
        },
    },
    attached() {
        const { defaultVisible, visible, controlled } = this.data
        const popoverVisible = controlled ? visible : defaultVisible

        this.setData({
            popoverVisible,
        })
    },
})
