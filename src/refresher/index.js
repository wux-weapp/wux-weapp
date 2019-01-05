import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const defaultStyle = 'transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-refresher',
        },
        pullingIcon: {
            type: String,
            value: '',
        },
        pullingText: {
            type: String,
            value: '下拉刷新',
        },
        refreshingIcon: {
            type: String,
            value: '',
        },
        refreshingText: {
            type: String,
            value: '正在刷新',
        },
        disablePullingRotation: {
            type: Boolean,
            value: false,
        },
        distance: {
            type: Number,
            value: 30,
        },
    },
    data: {
        style: defaultStyle,
        visible: false,
        active: false,
        refreshing: false,
        tail: false,
    },
    computed: {
        classes() {
            const {
                prefixCls,
                pullingText,
                pullingIcon,
                disablePullingRotation,
                refreshingText,
                refreshingIcon,
                visible,
                active,
                refreshing,
                tail,
            } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--hidden`]: !visible,
                [`${prefixCls}--visible`]: visible,
                [`${prefixCls}--active`]: active,
                [`${prefixCls}--refreshing`]: refreshing,
                [`${prefixCls}--refreshing-tail`]: tail,
            })
            const content = classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--text`]: pullingText || refreshingText,
            })
            const iconPulling = classNames(`${prefixCls}__icon-pulling`, {
                [`${prefixCls}__icon-pulling--disabled`]: disablePullingRotation,
            })
            const textPulling = `${prefixCls}__text-pulling`
            const iconRefreshing = `${prefixCls}__icon-refreshing`
            const textRefreshing = `${prefixCls}__text-refreshing`
            const pIcon = pullingIcon || `${prefixCls}__icon--arrow-down`
            const rIcon = refreshingIcon || `${prefixCls}__icon--refresher`

            return {
                wrap,
                content,
                iconPulling,
                textPulling,
                iconRefreshing,
                textRefreshing,
                pIcon,
                rIcon,
            }
        },
    },
    methods: {
        /**
         * 显示
         */
        activate() {
            this.setData({
                style: defaultStyle,
                visible: true,
            })
        },
        /**
         * 隐藏
         */
        deactivate() {
            if (this.activated) this.activated = false

            this.setData({
                style: defaultStyle,
                visible: false,
                active: false,
                refreshing: false,
                tail: false,
            })
        },
        /**
         * 正在刷新
         */
        refreshing() {
            this.setData({
                style: 'transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);',
                visible: true,
                active: true,
                refreshing: true,
            })
        },
        /**
         * 刷新后隐藏动画
         */
        tail() {
            this.setData({
                visible: true,
                active: true,
                refreshing: true,
                tail: true,
            })
        },
        /**
         * 正在下拉
         * @param {Number} diffY 距离
         */
        move(diffY) {
            const style = `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`
            const className = diffY < this.data.distance ? 'visible' : 'active'

            this.setData({
                style,
                [className]: true,
            })
        },
        /**
         * 判断是否正在刷新
         */
        isRefreshing() {
            return this.data.refreshing
        },
        /**
         * 获取触摸点坐标
         */
        getTouchPosition(e) {
            return {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        },
        /**
         * 创建定时器
         */
        requestAnimationFrame(callback) {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
            let timeout = setTimeout(() => {
                callback.bind(this)(currTime + timeToCall)
            }, timeToCall)
            this.lastTime = currTime + timeToCall
            return timeout
        },
        /**
         * 清空定时器
         */
        cancelAnimationFrame(timeout) {
            clearTimeout(timeout)
        },
        /**
         * 下拉刷新完成后的函数
         */
        finishPullToRefresh() {
            setTimeout(() => {
                this.requestAnimationFrame(this.tail)
                setTimeout(() => this.deactivate(), 200)
            }, 200)
        },
        /**
         * 手指触摸动作开始
         */
        bindtouchstart(e) {
            if (this.isRefreshing()) return false

            const p = this.getTouchPosition(e)

            this.start = p
            this.diffX = this.diffY = 0

            this.activate()
        },
        /**
         * 手指触摸后移动
         */
        bindtouchmove(e) {
            if (!this.start || this.isRefreshing()) return false

            const p = this.getTouchPosition(e)

            this.diffX = p.x - this.start.x
            this.diffY = p.y - this.start.y

            if (this.diffY < 0) return false

            this.diffY = Math.pow(this.diffY, 0.8)

            if (!this.activated && this.diffY > this.data.distance) {
                this.activated = true
                this.triggerEvent('pulling')
            } else if (this.activated && this.diffY < this.data.distance) {
                this.activated = false
            }

            this.move(this.diffY)
        },
        /**
         * 	手指触摸动作结束
         */
        bindtouchend(e) {
            this.start = false

            if (this.diffY <= 0 || this.isRefreshing()) return false

            this.deactivate()

            if (Math.abs(this.diffY) >= this.data.distance) {
                this.refreshing()
                this.triggerEvent('refresh')
            }
        },
    },
    created() {
        this.lastTime = 0
        this.activated = false
    },
})
