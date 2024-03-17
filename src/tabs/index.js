import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { bound } from '../helpers/shared/bound'
import { useRef } from '../helpers/hooks/useDOM'
import { props } from './props'

const getDefaultActiveKey = (elements) => {
    const target = elements.filter((element) => !element.data.disabled)[0]
    if (target) {
        return target.data.key
    }
    return null
}

const activeKeyIsValid = (elements, key) => {
    return elements.map((element) => element.data.key).includes(key)
}

const getActiveKey = (elements, activeKey) => {
    const defaultActiveKey = getDefaultActiveKey(elements)
    return !activeKey ? defaultActiveKey : !activeKeyIsValid(elements, activeKey) ? defaultActiveKey : activeKey
}

baseComponent({
    relations: {
        '../tab/index': {
            type: 'child',
            observer() {
                this.callDebounceFn(this.updated)
            },
        },
    },
    properties: props,
    data: {
        activeKey: '',
        keys: [],
        scrollLeft: 0,
        scrollTop: 0,
        showPrevMask: false,
        showNextMask: false,
        scrollViewStyle: '',
    },
    observers: {
        current(newVal) {
            if (this.data.controlled) {
                this.updated(newVal)
            }
        },
        justify(newVal) {
            this.setStyles(newVal)
        },
    },
    computed: {
        classes: ['prefixCls, direction, scroll', function(prefixCls, direction, scroll) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${direction}`]: direction,
                [`${prefixCls}--scroll`]: scroll,
            })
            const scrollView = `${prefixCls}__scroll-view`
            const prev = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--prev`])
            const next = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--next`])

            return {
                wrap,
                scrollView,
                prev,
                next,
            }
        }],
    },
    methods: {
        onScrollFix() {
            const { direction } = this.data

            if (direction === 'horizontal') {
                if (!this.updateMask) {
                    const { run: updateMask } = this.useThrottleFn(() => {
                        this.tabsContainerRef().then((container) => {
                            const scrollLeft = container.containerScrollLeft
                            const showPrevMask = scrollLeft > 0  
                            const showNextMask = Math.round(scrollLeft + container.containerWidth) < Math.round(container.containerScrollWidth)
                            this.setData(({
                                showPrevMask,
                                showNextMask,
                            }))
                        })
                    }, 100, {
                        trailing: true,
                        leading: true,
                    })
                    this.updateMask = updateMask
                }
                this.updateMask.call(this)
            }

            if (direction === 'vertical') {
                if (!this.updateMask) {
                    const { run: updateMask } = this.useThrottleFn(() => {
                        this.tabsContainerRef().then((container) => {
                            const scrollTop = container.containerScrollTop
                            const showPrevMask = scrollTop > 0  
                            const showNextMask = Math.round(scrollTop + container.containerHeight) < Math.round(container.containerScrollHeight)
                            this.setData(({
                                showPrevMask,
                                showNextMask,
                            }))
                        })
                    }, 100, {
                        trailing: true,
                        leading: true,
                    })
                    this.updateMask = updateMask
                }
                this.updateMask.call(this)
            }
        },
        tabsContainerRef() {
            const { prefixCls } = this.data
            return useRef(`.${prefixCls}__scroll-view`, this)               
                .then((container) => {
                    const containerWidth = container.width
                    const containerHeight = container.height
                    const containerScrollWidth = container.scrollWidth
                    const containerScrollHeight = container.scrollHeight
                    const containerScrollLeft = container.scrollLeft
                    const containerScrollTop = container.scrollTop
                    const containerOffsetX = container.left
                    const containerOffsetY = container.top
                    return {
                        containerWidth,
                        containerHeight,
                        containerScrollWidth,
                        containerScrollHeight,
                        containerScrollLeft,
                        containerScrollTop,
                        containerOffsetX,
                        containerOffsetY,
                    }
                })
        },
        setNextScroll(activeElement) {
            const { direction, scroll } = this.data
            if (!scroll) { return }

            let promise = Promise.all([
                this.tabsContainerRef(),
                activeElement.activeTabRef(),
            ])

            promise = promise.then(([container, activeTab]) => {
                if (direction === 'horizontal') {
                    const maxScrollDistance = container.containerScrollWidth - container.containerWidth
                    if (maxScrollDistance <= 0) { return [] }
                    const nextScrollLeft = Math.round(bound(
                        container.containerScrollLeft + (activeTab.activeTabLeft - container.containerOffsetX) - (container.containerWidth - activeTab.activeTabWidth) / 2,
                        0,
                        maxScrollDistance
                    ))
                    return [nextScrollLeft, undefined]
                }

                if (direction === 'vertical') {
                    const maxScrollDistance = container.containerScrollHeight - container.containerHeight
                    if (maxScrollDistance <= 0) { return [] }
                    const nextScrollTop = Math.round(bound(
                        container.containerScrollTop + (activeTab.activeTabTop - container.containerOffsetY) - (container.containerHeight - activeTab.activeTabHeight) / 2,
                        0,
                        maxScrollDistance
                    ))
                    return [undefined, nextScrollTop]
                }
            })

            promise = promise.then(([nextScrollLeft, nextScrollTop]) => {
                if (typeof nextScrollLeft !== 'undefined') {
                    this.setData({
                        scrollLeft: nextScrollLeft,
                    })
                    this.onScrollFix()
                }

                if (typeof nextScrollTop !== 'undefined') {
                    this.setData({
                        scrollTop: nextScrollTop,
                    })
                    this.onScrollFix()
                }
            })

            return promise
        },
        updated(value = this.data.activeKey) {
            const elements = this.getRelationsByName('../tab/index')
            const activeKey = getActiveKey(elements, value)

            if (this.data.activeKey !== activeKey) {
                this.setData({ activeKey })
            }

            this.changeCurrent(activeKey, elements)
        },
        changeCurrent(activeKey, elements) {
            const { scroll, theme, direction, activeLineMode } = this.data

            if (elements.length > 0) {
                elements.forEach((element) => {
                    element.changeCurrent({
                        current: element.data.key === activeKey,
                        context: {
                            scroll,
                            theme,
                            direction,
                            activeLineMode,
                        },
                    })
                    if (element.data.key === activeKey) {
                        this.setNextScroll(element)
                    }
                })
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data),
                })
            }
        },
        emitEvent(key) {
            this.triggerEvent('change', {
                key,
                keys: this.data.keys,
            })
        },
        setActiveKey(activeKey) {
            if (!this.data.controlled) {
                this.updated(activeKey)
            }

            this.emitEvent(activeKey)
        },
        /**
         * 水平排列方式
         */
        setStyles(justify) {
            if (this.data.direction === 'horizontal') {
                const scrollViewStyle = styleToCssString({
                    'justify-content': justify,
                })
                if (this.data.scrollViewStyle !== scrollViewStyle) {
                    this.setData({
                        scrollViewStyle,
                    })
                }
            }
        },
    },
    ready() {
        const { defaultCurrent, current, controlled, justify } = this.data
        const activeKey = controlled ? current : defaultCurrent

        this.updated(activeKey)
        this.setStyles(justify)
    },
})
