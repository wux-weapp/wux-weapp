import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { getTouchPoints, getPointsNumber, getSwipeDirection } from '../helpers/gestures'

baseComponent({
    relations: {
        '../swipe-action-group/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-swipe',
        },
        autoClose: {
            type: Boolean,
            value: false,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        left: {
            type: Array,
            value: [],
            observer: 'updateBtns',
        },
        right: {
            type: Array,
            value: [],
            observer: 'updateBtns',
        },
        useSlots: {
            type: Boolean,
            value: false,
        },
        data: {
            type: null,
            value: null,
        },
    },
    data: {
        index: 0,
        swiping: false,
        showCover: false,
        offsetStyle: '',
    },
    computed: {
        classes: ['prefixCls, swiping', function(prefixCls, swiping) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--swiping`]: swiping,
            })
            const cover = `${prefixCls}__cover`
            const left = classNames(`${prefixCls}__actions`, {
                [`${prefixCls}__actions--left`]: true,
            })
            const right = classNames(`${prefixCls}__actions`, {
                [`${prefixCls}__actions--right`]: true,
            })
            const action = `${prefixCls}__action`
            const text = `${prefixCls}__text`
            const content = `${prefixCls}__content`

            return {
                wrap,
                cover,
                left,
                right,
                action,
                text,
                content,
            }
        }],
    },
    methods: {
        updated(index) {
            if (this.data.index !== index) {
                this.setData({ index })
            }
        },
        onCloseSwipe() {
            const parent = this.getRelationNodes('../swipe-action-group/index')[0]

            if (parent) {
                parent.onCloseSwipe(this.data.index)
            }
        },
        getContentEasing(value, limit) {
            // limit content style left when value > actions width
            const delta = Math.abs(value) - Math.abs(limit)
            const isOverflow = delta > 0
            const factor = limit > 0 ? 1 : -1

            if (isOverflow) {
                value = limit + Math.pow(delta, 0.85) * factor
                return Math.abs(value) > Math.abs(limit) ? limit : value
            }

            return value
        },
        setStyle(value) {
            const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth
            const left = this.getContentEasing(value, limit)
            const offsetStyle = `left: ${left}px`
            const showCover = Math.abs(value) > 0

            if (this.data.offsetStyle !== offsetStyle || this.data.showCover !== showCover) {
                this.setData({ offsetStyle, showCover })
            }
        },
        updateBtns() {
            const { prefixCls } = this.data
            const query = wx.createSelectorQuery().in(this)
            query.select(`.${prefixCls}__actions--left`).boundingClientRect()
            query.select(`.${prefixCls}__actions--right`).boundingClientRect()
            query.exec((rects) => {
                const [left, right] = rects
                this.btnsLeftWidth = left ? left.width : 0
                this.btnsRightWidth = right ? right.width : 0
            })
        },
        onTap(e) {
            const { type } = e.currentTarget.dataset
            const params = {
                ...e.currentTarget.dataset,
                buttons: this.data[type],
                data: this.data.data,
            }

            if (this.data.autoClose) {
                this.onClose()
            }

            this.triggerEvent('click', params)
        },
        onAcitons() {
            if (this.data.autoClose) {
                this.onClose()
            }
        },
        onOpen(value, openedLeft, openedRight) {
            if (!this.openedLeft && !this.openedRight) {
                this.triggerEvent('open')
            }

            this.openedLeft = openedLeft
            this.openedRight = openedRight
            this.setStyle(value)
        },
        onClose() {
            if (this.openedLeft || this.openedRight) {
                this.triggerEvent('close')
            }

            this.openedLeft = false
            this.openedRight = false
            this.setStyle(0)
        },
        onOpenLeft() {
            this.onOpen(this.btnsLeftWidth, true, false)
        },
        onOpenRight() {
            this.onOpen(-this.btnsRightWidth, true, false)
        },
        onTouchStart(e) {
            if (this.data.disabled || getPointsNumber(e) > 1) return
            this.start = getTouchPoints(e)
            this.onCloseSwipe()
        },
        onTouchMove(e) {
            if (this.data.disabled || getPointsNumber(e) > 1) return

            this.move = getTouchPoints(e)

            const deltaX = this.move.x - this.start.x
            const direction = getSwipeDirection(this.start.x, this.move.x, this.start.y, this.move.y)
            const isLeft = direction === 'Left'
            const isRight = direction === 'Right'

            if (!isLeft && !isRight) return

            const { left, right, useSlots } = this.data

            this.needShowRight = isLeft && (useSlots || right.length > 0)
            this.needShowLeft = isRight && (useSlots || left.length > 0)

            if (this.needShowLeft || this.needShowRight) {
                this.swiping = true
                this.setData({ swiping: true })
                this.setStyle(deltaX)
            }
        },
        onTouchEnd(e) {
            if (this.data.disabled || getPointsNumber(e) > 1 || !this.swiping) return

            this.end = getTouchPoints(e)

            const deltaX = this.end.x - this.start.x
            const needOpenRight = this.needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2
            const needOpenLeft = this.needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2

            if (needOpenRight) {
                this.onOpenRight()
            } else if (needOpenLeft) {
                this.onOpenLeft()
            } else {
                this.onClose()
            }

            this.swiping = false
            this.setData({ swiping: false })

            this.needShowLeft = false
            this.needShowRight = false
        },
        noop() {},
    },
    created() {
        this.btnsLeftWidth = 0
        this.btnsRightWidth = 0
        this.openedLeft = false
        this.openedRight = false
        this.needShowLeft = false
        this.needShowRight = false
    },
    ready() {
        this.updateBtns()
    },
})
