import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'
import debounce from '../helpers/debounce'
import { mapVirtualToProps, getVisibleItemBounds } from './utils'

baseComponent({
    relations: {
        '../virtual-item/index': {
            type: 'descendant',
            observer() {
                this.debounce(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-virtual-list',
        },
        itemHeight: {
            type: Number,
            value: 50,
        },
        itemBuffer: {
            type: Number,
            value: 0,
        },
        scrollToIndex: {
            type: Number,
            value: 0,
        },
        upperThreshold: {
            type: Number,
            value: 50,
        },
        lowerThreshold: {
            type: Number,
            value: 50,
        },
        scrollWithAnimation: {
            type: Boolean,
            value: false,
        },
        enableBackToTop: {
            type: Boolean,
            value: false,
        },
        disableScroll: {
            type: Boolean,
            value: false,
        },
        enablePageScroll: {
            type: Boolean,
            value: false,
        },
        height: {
            type: Number,
            value: 300,
        },
        debounce: {
            type: Number,
            value: 0,
        },
    },
    data: {
        wrapStyle: '', // 最外层容器样式
        scrollOffset: 0, // 用于记录滚动条实际位置
        innerScrollOffset: 0, // 用于设置滚动条位置
        startIndex: 0, // 第一个元素的索引值
        endIndex: -1, // 最后一个元素的索引值
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const mask = `${prefixCls}__mask`
            const scrollView = `${prefixCls}__scroll-view`
            const scrollArea = `${prefixCls}__scroll-area`

            return {
                wrap,
                mask,
                scrollView,
                scrollArea,
            }
        }],
    },
    observers: {
        itemHeight(newVal) {
            this.updated(newVal)
        },
        height(newVal) {
            this.updatedStyle(newVal)
        },
        debounce(newVal) {
            this.setScrollHandler(newVal)
        },
        ['enablePageScroll, height, itemHeight, itemBuffer']() {
            if (this.firstRendered) {
                this.onChange(this.data.scrollOffset, true)
            }
        },
        scrollToIndex(newVal) {
            if (this.firstRendered) {
                this.scrollToIndex(newVal)
            }
        },
    },
    methods: {
        /**
         * 设置子元素的高度
         * @param {Number} itemHeight 子元素高度
         */
        updated(itemHeight = this.data.itemHeight) {
            const elements = this.getRelationNodes('../virtual-item/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updated(index, itemHeight)
                })
            }
        },
        /**
         * 设置最外层容器样式
         * @param {Number} height page 高度
         */
        updatedStyle(height) {
            this.setValue(styleToCssString({ height }), 'wrapStyle')
        },
        /**
         * set value
         * @param {Any} value 属性值
         * @param {String} field 字段值
         * @param {Boolean} isForce 是否强制更新
         */
        setValue(value, field = 'scrollOffset', isForce) {
            if (this.data[field] !== value || isForce) {
                this.setData({
                    [field]: value,
                })
            }
        },
        /**
         * 用于计算虚拟列表数据
         * @param {Function} callback 设置完成后的回调函数
         */
        loadData(callback) {
            const { itemHeight, startIndex, endIndex, scrollOffset } = this.data
            const options = {
                items: this.items,
                itemHeight,
            }
            const indexes = {
                startIndex,
                endIndex,
            }
            const values = mapVirtualToProps(options, indexes)
            this.setData(values, () => {
                if (typeof callback === 'function') {
                    callback.call(this, { ...values, ...indexes, scrollOffset })
                }
            })
        },
        /**
         * 数据变化时的回调函数
         * @param {Number} scrollOffset 记录滚动条实际位置
         * @param {Boolean} scrolled 是否设置滚动条位置
         * @param {Function} callback 设置完成后的回调函数
         */
        onChange(scrollOffset, scrolled, callback) {
            // 计算起始点是否发生变化
            const { itemHeight, height, itemBuffer, startIndex, endIndex, offsetTop, enablePageScroll } = this.data
            const itemCount = Math.max(0, this.items.length - 1)
            const listTop = enablePageScroll ? offsetTop : 0
            const viewTop = scrollOffset - listTop
            const state = getVisibleItemBounds(viewTop, height, itemCount, itemHeight, itemBuffer)
            const hasChanged = state.startIndex !== startIndex || state.endIndex !== endIndex

            // 计算起始点是否可视
            const direction = scrollOffset > this.data.scrollOffset ? 'Down' : 'Up'
            const firstItemVisible = direction === 'Up' && viewTop < startIndex * itemHeight
            const lastItemVisible = direction === 'Down' && viewTop > (endIndex * itemHeight - height)

            // 判断起始点大小
            if (state === undefined || state.startIndex > state.endIndex) return

            // 判断起始点是否发生变化及是否可视状态   
            if (hasChanged && (firstItemVisible || lastItemVisible) || scrolled) {
                this.setData(state, () => {
                    this.loadData((values) => {
                        // scroll into view
                        if (scrolled) {
                            this.setValue(scrollOffset, 'innerScrollOffset', true)
                        }
                        // trigger change
                        this.triggerEvent('change', { ...values, direction, scrollOffset })
                        // trigger callback
                        if (typeof callback === 'function') {
                            callback.call(this, { ...values, direction, scrollOffset })
                        }
                    })
                })
            }

            // 记录滚动条的位置（仅记录不去设置）
            this.setValue(scrollOffset)
        },
        /**
         * 滚动时触发的事件
         */
        onScroll(e) {
            this.onChange(e.detail.scrollTop)
            this.triggerEvent('scroll', e.detail)
        },
        /**
         * 滚动到顶部时触发的事件
         */
        onScrollToUpper(e) {
            this.triggerEvent('scrolltoupper', e.detail)
        },
        /**
         * 滚动到底部时触发的事件
         */
        onScrollToLower(e) {
            this.triggerEvent('scrolltolower', e.detail)
        },
        /**
         * 根据索引值获取偏移量
         * @param {Number} index 指定的索引值
         * @param {Number} itemHeight 子元素高度
         * @param {Number} itemSize 子元素个数
         */
        getOffsetForIndex(index, itemHeight = this.data.itemHeight, itemSize = this.items.length) {
            const realIndex = Math.max(0, Math.min(index, itemSize - 1))
            const scrollOffset = realIndex * itemHeight
            return scrollOffset
        },
        /**
         * 更新组件
         * @param {Array} items 实际数据列表，当需要动态加载数据时设置
         * @param {Function} success 设置完成后的回调函数
         */
        render(items, success) {
            let { scrollOffset } = this.data
            if (Array.isArray(items)) {
                this.items = items
            }
            // 首次渲染时滚动至 scrollToIndex 指定的位置
            if (!this.firstRendered) {
                this.firstRendered = true
                scrollOffset = this.getOffsetForIndex(this.data.scrollToIndex)
            }
            this.getBoundingClientRect(() => this.onChange(scrollOffset, true, success))
        },
        /**
         * 滚动到指定的位置
         * @param {Number} scrollOffset 指定的位置
         * @param {Function} success 设置完成后的回调函数
         */
        scrollTo(scrollOffset, success) {
            if (typeof scrollOffset === 'number') {
                const offset = Math.max(0, Math.min(scrollOffset, this.items.length * this.data.itemHeight))
                this.onChange(offset, true, success)
            }
        },
        /**
         * 根据索引值滚动到指定的位置
         * @param {Number} index 指定元素的索引值
         * @param {Function} success 设置完成后的回调函数
         */
        scrollToIndex(index, success) {
            if (typeof index === 'number') {
                this.onChange(this.getOffsetForIndex(index), true, success)
            }
        },
        /**
         * 绑定滚动事件
         * @param {Boolean} _debounce 是否防抖
         */
        setScrollHandler(_debounce = this.data.debounce) {
            this.scrollHandler = _debounce ? debounce(this.onScroll.bind(this), _debounce, false) : this.onScroll
        },
        /**
         * 阻止触摸移动
         */
        noop() {},
        /**
         * 获取容器的偏移量
         * @param {Function} callback 设置完成后的回调函数
         * @param {Boolean} isForce 是否强制更新
         */
        getBoundingClientRect(callback, isForce) {
            if (this.data.offsetTop !== undefined && !isForce) {
                callback.call(this)
                return
            }
            const className = `.${this.data.prefixCls}`
            wx
                .createSelectorQuery()
                .in(this)
                .select(className)
                .boundingClientRect((rect) => {
                    if (!rect) return
                    this.setData({ offsetTop: rect.top }, callback)
                })
                .exec()
        },
    },
    created() {
        this.items = []
        this.firstRendered = false
    },
    ready() {
        const { height, debounce } = this.data
        this.updatedStyle(height)
        this.setScrollHandler(debounce)
        this.getBoundingClientRect()
        this.loadData()
    },
})
