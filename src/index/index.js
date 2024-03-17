import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import warning from '../helpers/libs/warning'
import styleToCssString from '../helpers/libs/styleToCssString'
import { vibrateShort } from '../helpers/hooks/useNativeAPI'
import { useRectAll } from '../helpers/hooks/useDOM'

const findActiveByIndex = (current, currentName, children) => {
    return children.filter((child) => (
        child.index === current &&
            child.name === currentName
    ))[0]
}
  
const findActiveByPosition = (scrollTop, offsetY, children) => {
    return children.filter((child) => (
        scrollTop < (child.top + child.height - offsetY) &&
            scrollTop >= (child.top - offsetY)
    ))[0]
}

baseComponent({
    useExport: true,
    relations: {
        '../index-item/index': {
            type: 'child',
            observer() {
                this.callDebounceFn(this.updated)
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
        indicatorPosition: {
            type: String,
            value: 'center',
        },
        parentOffsetTop: {
            type: Number,
            value: 0,
        },
    },
    data: {
        colHight: 0,
        points: [],
        scrollTop: 0,
        children: [],
        moving: false,
        current: 0,
        currentName: '',
        currentBrief: '',
        extStyle: '',
        indicatorStyle: '',
    },
    computed: {
        classes: ['prefixCls, indicatorPosition', function(prefixCls, indicatorPosition) {
            const wrap = classNames(prefixCls)
            const nav = `${prefixCls}__nav`
            const navRow = `${prefixCls}__nav-row`
            const navCol = `${prefixCls}__nav-col`
            const navItem = `${prefixCls}__nav-item`
            const indicator = classNames(`${prefixCls}__indicator`, {
                [`${prefixCls}__indicator--${indicatorPosition}`]: indicatorPosition,
            })

            return {
                wrap,
                nav,
                navRow,
                navCol,
                navItem,
                indicator,
            }
        }],
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
            const elements = this.getRelationsByName('../index-item/index')

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updated(index)
                })

                // HACK: https://github.com/wux-weapp/wux-weapp/issues/224
                setTimeout(this.getNavPoints.bind(this))
            }

            this.updateChildren()
        },
        /**
         * 设置当前激活的元素
         */
        setActive(current, currentName) {
            if (current !== this.data.current || currentName !== this.data.currentName) {
                const target = findActiveByIndex(current, currentName, this.data.children)
                const currentBrief = target !== undefined ? target.brief : currentName.charAt(0)
                if (target !== undefined) {
                    const { colHight, indicatorPosition } = this.data
                    const indicatorStyle = indicatorPosition === 'right'
                        ? styleToCssString({ top: current * colHight + colHight / 2 })
                        : ''

                    this.setData({
                        current,
                        currentName,
                        currentBrief,
                        scrollTop: target.top - this.data.parentOffsetTop,
                        indicatorStyle,
                    })
                }

                // 振动反馈
                vibrateShort()
                this.triggerEvent('change', { index: current, name: currentName, brief: currentBrief })
            }
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
        onTouchEnd() {
            if (!this.data.moving) return
            setTimeout(() => this.setData({ moving: false }), 300)
        },
        /**
         * 滚动事件的回调函数
         */
        onScroll(e) {
            if (this.data.moving) return
            this.checkActiveIndex.call(this, this.data, e)
        },
        /**
         * 获取右侧导航对应的坐标
         */
        getNavPoints() {
            const navColCls = `.${this.data.prefixCls}__nav-col`
            const navItemCls = `.${this.data.prefixCls}__nav-item`

            useRectAll([navColCls, navItemCls], this)
                .then(([cols, items]) => {
                    if (!cols.length && !items.length) return
                    this.setData({
                        colHight: cols[0].height,
                        points: items.map((n) => ({ ...n, offsets: [n.top, n.top + n.height] })),
                    })
                })
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
        getInternalHooks(key) {
            if (key === 'INDEX_HOOK_MARK') {
                return {
                    updateChildren: this.updateChildren.bind(this),
                }
            }
            warning(
                false,
                '`getInternalHooks` is internal usage of the <index />. Should not call directly.'
            )
            return null
        },
        expose() {
            const scrollTo = (index) => {
                const { children } = this.data
                const child = typeof index === 'number'
                    ? children.filter((child) => (child.index === index))[0]
                    : children.filter((child) => (child.name === index))[0]
                if (child) {
                    this.setData({ moving: true })
                    this.setActive(child.index, child.name)
                    setTimeout(() => this.setData({ moving: false }), 300)
                }
            }

            return {
                scrollTo,
                getInternalHooks: this.getInternalHooks.bind(this),
            }
        },
    },
    created() {
        const { run: checkActiveIndex } = this.useThrottleFn((data, event) => {
            const target = findActiveByPosition(event.detail.scrollTop, data.parentOffsetTop, data.children)
            if (target !== undefined) {
                const current = target.index
                const currentName = target.name
                const currentBrief = target.brief
                if (current !== data.current || currentName !== data.currentName) {
                    this.setData({
                        current,
                        currentName,
                        currentBrief,
                    })
                    this.triggerEvent('change', { index: current, name: currentName, brief: currentBrief })
                }
            }
        }, 50, { trailing: true, leading: true })

        this.checkActiveIndex = checkActiveIndex

        const propsFilter = (props) => ({
            name: props.name,
            index: props.index,
            top: props.top,
            height: props.height,
            brief: props.brief,
        })
        const { run: updateChildren } = this.useThrottleFn(() => {
            const nodeList = this.getRelationsByName('../index-item/index')
            const children = nodeList.map((node) => propsFilter(node.data))
            this.setData({
                children,
            })
        }, 50, { trailing: true, leading: true })

        this.updateChildren = updateChildren
    },
    ready() {
        this.updateStyle()
        this.getNavPoints()
        this.updateChildren()
    },
})
