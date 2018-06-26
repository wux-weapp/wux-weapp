import baseBehavior from '../helpers/baseBehavior'

export const ENTER = 'enter'
export const ENTERING = 'entering'
export const ENTERED = 'entered'
export const EXIT = 'exit'
export const EXITING = 'exiting'
export const EXITED = 'exited'

const TRANSITION = 'transition'
const ANIMATION = 'animation'

const defaultClassNames = {
    enter: '', // 进入过渡的开始状态，在过渡过程完成之后移除
    enterActive: '', // 进入过渡的结束状态，在过渡过程完成之后移除
    enterDone: '', // 进入过渡的完成状态
    exit: '', // 离开过渡的开始状态，在过渡过程完成之后移除
    exitActive: '', // 离开过渡的结束状态，在过渡过程完成之后移除
    exitDone: '', // 离开过渡的完成状态
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: {
        animateCss: '', // 动画样式
        animateStatus: EXITED, // 动画状态，可选值 entering、entered、exiting、exited
    },
    properties: {
        // 触发组件进入或离开过渡的状态
        in: {
            type: Boolean,
            value: false,
            observer(newVal) {
                const { animateStatus } = this.data

                if (newVal) {
                    if (animateStatus !== ENTERING && animateStatus !== ENTERED) {
                        this.nextStatus = ENTERING
                    }
                } else {
                    if (animateStatus === ENTERING || animateStatus === ENTERED) {
                        this.nextStatus = EXITING
                    }
                }

                this.updateStatus(this.nextStatus)
            },
        },
        // 过渡的类名
        classNames: {
            type: null,
            value: defaultClassNames,
        },
        // 过渡持续时间
        duration: {
            type: null,
            value: null,
        },
        // 过渡动效的类型
        type: {
            type: String,
            value: TRANSITION,
        },
        // 是否启用进入过渡
        enter: {
            type: Boolean,
            value: true,
        },
        // 是否启用离开过渡
        exit: {
            type: Boolean,
            value: true,
        },
    },
    methods: {
        /**
         * 监听过渡或动画的回调函数
         */
        addEventListener() {
            const { animateStatus } = this.data
            const { enter, exit } = this.getTimeouts()

            if (animateStatus === ENTERING && !enter && this.data.enter) {
                this.performEntered()
            }

            if (animateStatus === EXITING && !exit && this.data.exit) {
                this.performExited()
            }
        },
        /**
         * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
         */
        onTransitionEnd() {
            if (this.data.type === TRANSITION) {
                this.addEventListener()
            }
        },
        /**
         * 会在一个 WXSS animation 动画完成时触发
         */
        onAnimationEnd() {
            if (this.data.type === ANIMATION) {
                this.addEventListener()
            }
        },
        /**
         * 更新组件状态
         * @param {String} nextStatus 下一状态，ENTERING 或 EXITING
         */
        updateStatus(nextStatus) {
            if (nextStatus === ENTERING) {
                this.performEnter()
            } else {
                this.performExit()
            }
        },
        /**
         * 进入过渡
         */
        performEnter() {
            const { className, activeClassName } = this.getClassNames(ENTER)
            const { enter } = this.getTimeouts()
            const enterParams = {
                animateCss: className,
                visible: true,
            }
            const enteringParams = {
                animateStatus: ENTERING,
                animateCss: `${className} ${activeClassName}`,
            }

            // 若已禁用进入过渡，则更新状态至 ENTERED
            if (!this.data.enter) {
                return this.$$setData({ visible: true }).then(() => this.performEntered())
            }

            // 第一阶段：设置进入过渡的开始状态，并触发 ENTER 事件
            // 第二阶段：延迟一帧后，设置进入过渡的结束状态，并触发 ENTERING 事件
            // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发进入过渡完成 performEntered，否则等待触发 onTransitionEnd 或 onAnimationEnd
            this
                .$$setData(enterParams)
                .then(() => this.triggerEvent(ENTER))
                .then(() => this.$$requestAnimationFrame(() => this.$$setData(enteringParams)))
                .then(() => this.triggerEvent(ENTERING))
                .then(() => enter && this.$$requestAnimationFrame(() => this.performEntered(), enter))
        },
        /**
         * 进入过渡完成
         */
        performEntered() {
            const { doneClassName } = this.getClassNames(ENTER)
            const enteredParams = {
                animateStatus: ENTERED,
                animateCss: doneClassName,
            }

            // 第三阶段：设置进入过渡的完成状态，并触发 ENTERED 事件
            this
                .$$setData(enteredParams)
                .then(() => this.triggerEvent(ENTERED))
        },
        /**
         * 离开过渡
         */
        performExit() {
            const { className, activeClassName } = this.getClassNames(EXIT)
            const { exit } = this.getTimeouts()
            const exitParams = {
                animateCss: className,
            }
            const exitingParams = {
                animateStatus: EXITING,
                animateCss: `${className} ${activeClassName}`,
            }

            // 若已禁用离开过渡，则更新状态至 EXITED
            if (!this.data.exit) {
                return this.performExited()
            }

            // 第一阶段：设置离开过渡的开始状态，并触发 EXIT 事件
            // 第二阶段：延迟一帧后，设置离开过渡的结束状态，并触发 EXITING 事件
            // 第三阶段：若已设置过渡的持续时间，则延迟指定时间后触发离开过渡完成 performExited，否则等待触发 onTransitionEnd 或 onAnimationEnd
            this
                .$$setData(exitParams)
                .then(() => this.triggerEvent(EXIT))
                .then(() => this.$$setData(exitingParams))
                .then(() => this.triggerEvent(EXITING))
                .then(() => exit && this.$$requestAnimationFrame(() => this.performExited(), exit))
        },
        /**
         * 离开过渡完成
         */
        performExited() {
            const { doneClassName } = this.getClassNames(EXIT)
            const exitedParams = {
                animateStatus: EXITED,
                animateCss: doneClassName,
            }

            // 第三阶段：设置离开过渡的完成状态，并触发 EXITED 事件
            this
                .$$setData(exitedParams)
                .then(() => this.triggerEvent(EXITED))
                .then(() => this.$$requestAnimationFrame(() => this.$$setData({ visible: false })))
        },
        /**
         * 获取指定状态下的类名
         * @param {String} type 过渡类型，enter 或 exit
         */
        getClassNames(type) {
            const { classNames } = this.data
            const className = typeof classNames !== 'string' ? classNames[type] : `${classNames}-${type}`
            const activeClassName = typeof classNames !== 'string' ? classNames[`${type}Active`] : `${classNames}-${type}-active`
            const doneClassName = typeof classNames !== 'string' ? classNames[`${type}Done`] : `${classNames}-${type}-done`

            return {
                className,
                activeClassName,
                doneClassName,
            }
        },
        /**
         * 获取过渡持续时间
         */
        getTimeouts() {
            const { duration } = this.data

            if (duration !== null && typeof duration === 'object') {
                return {
                    enter: duration.enter,
                    exit: duration.exit,
                }
            } else if (typeof duration === 'number') {
                return {
                    enter: duration,
                    exit: duration,
                }
            }

            return {}
        },
        /**
         * 点击事件
         */
        onTap() {
            this.triggerEvent('click')
        },
    },
})