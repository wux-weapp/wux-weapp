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

Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
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
            type: String,
            value: '',
            observer(newVal) {
                const bodyStyle = newVal.trim()
                const popoverBodyStyle = bodyStyle ? bodyStyle.split(';').filter((n) => !!n) : []

                this.setData({
                    popoverBodyStyle: popoverBodyStyle.join(';'),
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
        popoverStyle: '',
        popoverBodyStyle: '',
        popoverVisible: false,
    },
    methods: {
        getPopoverStyle() {
            const query = wx.createSelectorQuery().in(this)
            query.select('.wux-popover__element').boundingClientRect()
            query.selectViewport().scrollOffset()
            query.select('.wux-popover').boundingClientRect()
            query.exec((rects) => {
                if (rects.filter((n) => !n).length) {
                    return false
                }

                const popoverStyle = this.data.popoverBodyStyle ? this.data.popoverBodyStyle.split(';') : []
                const placements = getPlacements(rects, this.data.placement)

                for (const key in placements) {
                    popoverStyle.push(`${key}: ${placements[key]}px`)
                }

                this.setData({
                    popoverStyle: popoverStyle.join(';'),
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
        const { popoverBodyStyle, defaultVisible, visible, controlled } = this.data
        const popoverVisible = controlled ? visible : defaultVisible

        this.setData({
            popoverVisible,
            popoverStyle: popoverBodyStyle,
        })
    },
})