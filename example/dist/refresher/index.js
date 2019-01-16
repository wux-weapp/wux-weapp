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
        prefixLCls: {
            type: String,
            value: 'wux-loader'
        },
        isShowLoadingText: {
            type: Boolean,
            value: false
        },
        loadingText: {
            type: String,
            value: '正在加载'
        },
        loadNoDataText: {
            type: String,
            value: '没有更多数据'
        },
        scrollTop: {
            type: Number,
            value: 0,
            observer: function (n) {
                let that = this

                // 获取节点高度
                const query = wx.createSelectorQuery();
                query.select(`#${this.id}`).boundingClientRect(function (res) {
                    that.setData({
                        newContentHeight: res.height
                    })
                }).exec()

                const {
                    newContentHeight,
                    oldContentHeight,
                    windowHeight,
                    distance,
                    loading,
                    noData
                } = this.data
                
                if (windowHeight && !this.isRefreshing()) {

                    // 到临界点时触发上拉加载 
                    // 防止节点高度一致时引发重复加载
                    if (
                        n > newContentHeight - windowHeight - (distance * 1.5) &&
                        loading === false &&
                        noData === false && newContentHeight !== oldContentHeight
                    ) {

                        this.setData({
                            loading: true,
                            refreshing: false,
                            oldContentHeight: newContentHeight
                        })

                        this.triggerEvent('loadmore')

                    } else if (
                        loading === false &&
                        noData === false
                    ) {

                        // 隐藏上拉加载动画
                        this.hide()

                    } else if(loading === true) {

                        // 如果在加载中，保持内容的高度一致，以此来防止临界点重复加载
                        this.setData({
                            oldContentHeight: newContentHeight
                        })
                        
                    }

                    this.deactivate()
                }
            }
        },
    },
    data: {
        style: defaultStyle,
        visible: false,
        active: false,
        refreshing: false,
        tail: false,
        lVisible: false,
        noData: false, // 是否没有更多数据
        windowHeight: 0,  // 窗口高度
        newContentHeight: 0,  // 新节点内容高度
        oldContentHeight: 0,   // 旧节点内容高度
        loading: false,   // 判断是否正在加载
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
                prefixLCls,
                loading,
                noData,
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

            const lWrap = classNames(prefixLCls, {
                [`${prefixLCls}--hidden`]: !loading,
                [`${prefixLCls}--visible`]: loading,
                [`${prefixLCls}--end`]: noData,
            })
            const lContent = `${prefixLCls}__content`

            return {
                wrap,
                content,
                iconPulling,
                textPulling,
                iconRefreshing,
                textRefreshing,
                pIcon,
                rIcon,
                lWrap,
                lContent,
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

                // 刷新时重新初始化加载状态
                loading: false,
                noData: false,
                newContentHeight: 0,
                oldContentHeight: 0,
                lVisible: false,
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
         * 加载后隐藏动画
         */
        hide() {
            this.setData({
                lVisible: false,
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
         * 判断是否正在加载
         */
        isLoading() {
            return this.data.loading
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
         * 上拉加载完成后的函数
         */
        finishLoadmore(bool) {
            if (bool === true) {
                setTimeout(() => {
                    this.setData({
                        noData: true,
                        loading: false,
                    })
                }, 200)
            } else {
                setTimeout(() => {
                    this.setData({
                        loading: false
                    })
                    this.requestAnimationFrame(this.hide)
                    setTimeout(() => this.deactivate(), 200)
                }, 200)
            }
        },
        /**
         * 手指触摸动作开始
         */
        bindtouchstart(e) {
            if (this.isRefreshing() || this.isLoading()) return false

            const p = this.getTouchPosition(e)

            this.start = p
            this.diffX = this.diffY = 0

            this.activate()
        },
        /**
         * 手指触摸后移动
         */
        bindtouchmove(e) {
            if (!this.start || this.isRefreshing() || this.isLoading()) return false

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

            if (this.diffY <= 0 || this.isRefreshing() || this.isLoading()) return false

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
    attached() {
        let that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                })
            }
        });
    }
})
