import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    relations: {
        '../index-item/index': {
            type: 'child',
            observer() {
                this.debounce(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-index',
        },
        height: {
            type: [String, Number],
            value: 300,
            observer: 'updateStyle',
        },
        showIndicator: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        scrollTop: 0,
        sections: [],
        moving: false,
        current: 0,
        currentName: '',
        extStyle: '',
    },
    computed: {
        classes() {
            const { prefixCls } = this.data
            const wrap = classNames(prefixCls)
            const nav = `${prefixCls}__nav`
            const navItem = `${prefixCls}__nav-item`
            const indicator = `${prefixCls}__indicator`

            return {
                wrap,
                nav,
                navItem,
                indicator,
            }
        },
    },
    methods: {
        /**
         * 更新样式
         */
        updateStyle(height = this.data.height) {
            const extStyle = styleToCssString({ height })

            if (extStyle !== this.data.extStyle) {
                this.setData({
                    extStyle,
                })
            }
        },
        /**
         * 更新元素
         */
    	updated() {
            const elements = this.getRelationNodes('../index-item/index')

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updated(index)
                })

                this.getNavPoints()
            }

            if (this.data.sections.length !== elements.length) {
                this.setData({
                    sections: elements.map((element) => element.data)
                })
            }
        },
        /**
         * 设置当前激活的元素
         */
        setActive(current, currentName) {
            if (current !== this.data.current || currentName !== this.data.currentName) {
                const target = this.data.sections.filter((section) => section.index === current && section.name === currentName)[0]
                if (target) {
                    this.setData({
                        current,
                        currentName,
                        scrollTop: target.top,
                    })
                }
            }

            this.triggerEvent('change', { index: current, name: currentName })
        },
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {
            if (this.data.moving) return
            const { index, name } = e.target.dataset
            this.setActive(index, name)
            this.setData({ moving: true })
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            const target = this.getTargetFromPoint(e.changedTouches[0].pageY)

            if (target !== undefined) {
                const { index, name } = target.dataset
                this.setActive(index, name)
            }
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (!this.data.moving) return
            setTimeout(() => this.setData({ moving: false }), 300)
        },
        /**
         * 滚动事件的回调函数
         */
        onScroll(e) {
            if (this.data.moving) return
            const { scrollTop } = e.detail
            this.data.sections.forEach((section, index) => {
                if (scrollTop < section.top + section.height && scrollTop >= section.top) {
                    if (index !== this.data.current || section.name !== this.data.currentName) {
                        this.setData({
                            current: index,
                            currentName: section.name,
                        })
                    }
                }
            })
        },
        /**
         * 获取右侧导航对应的坐标
         */
        getNavPoints() {
            const className = `.${this.data.prefixCls}__nav-item`
            wx
                .createSelectorQuery()
                .in(this)
                .selectAll(className)
                .boundingClientRect((rects) => {
                    if (rects.filter((n) => !n).length) return
                    this.setData({
                        points: rects.map((n) => ({ ...n, offsets: [n.top, n.top + n.height] })),
                    })
                })
                .exec()
        },
        /**
         * 根据坐标获得对应的元素
         */
        getTargetFromPoint(y) {
            const { points } = this.data
            let target

            for (let i = points.length - 1; i >= 0; i--) {
                const [a, b] = points[i].offsets

                // 1.判断是否为第一个元素且大于最大坐标点
                // 2.判断是否为最后一个元素且小于最小坐标点
                // 3.判断是否包含于某个坐标系内
                if ((i === points.length - 1 && y > b) || (i === 0 && y < a) || (y >= a && y <= b)) {
                    target = points[i]
                    break
                }
            }

            return target
        },
    },
    ready() {
        this.updateStyle()
        this.getNavPoints()
    },
})
