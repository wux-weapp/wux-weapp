import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const notice = 'data:image/png;base64,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'
const close = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAEAYAAAD6+a2dAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAyFJREFUeNrt3D9oE1EcB/D3ri2JdSp1kEKlhHTRyVGkuHSQRIQsLaXo0KHkD3RSRMWpk+iikKR06KBIbaEExASHbkV0c1GXSmgKFoeWIkJtUrnn0t8NKeHSNO/u/fl+tpKD/N7v9+1dyLscYwAAAAAAAAAAAAAAYDIu+w0OH2TSo2/Gx9kiHxCLS0veGw+JCX4rk4l8K17dvF8uh92IsNSvZL6MPksmxQ5fFe+LRe+FWbHPZ2dmok+LC5vT6+uy3l9+AAayD+M3trfFDvvNfg4Pey98ZxfEu6MjUeEHYm9ysv9J/nl1rFSSXY8qDuZz92IbqRRPiH4+uLLCLrNdfruvzzsgyqpsrlY7xwsffsyNjMiqwwmtA8cLpgZQQ0KrJyC+g/cOZI9ErxCy65EeADrV03/8iQMsCULbgz/uk3OJPxZOLie7LukBoGu8c1eknHIqxT6yX+xfvX7iQEODQNd4fk1UnTvLy36Dp0tiZC+/UU1XKrLrk/4ZoFVD3Bd8XuTX1th1dpH1RiJ+DdHtM4Iu6ww8ALo1yPR1hRYAXRtm2jpCDwDRtYG61k2UCQDRpaG61OlHuQAQVRusal2dUjYARJWGq1JHtykfABLWAEwdPNEmACSogZg+eKJdAIisAdkyeKJtAEi3Bmbb4In2ASCdDrDnrTvd87nRsG3wxJgAkNPuunl/t7lJY8rgiXEBIG2fEVoxfPAkvBtCJKNtaPGJx9zXU1Mt70doZsngibEBIHSNZ/vsK0+4btj1qAaXgFYsORMYFwB8CDwdYy4Bnd56ZeutakT7MwC+CDobbQOAr4K7Q7sAYDOou7QJALaD5VA+AKoMQJU6uk3ZAKjacFXr6pRyAdClwbrU6UeZAOjaUF3rJqEHQPcG6r4O/DTM8nXhx6GWrzOwAOjSENvWLX0zyGvAK15yk6WSag2Qre0bU5o2neqDubHYQiIhuz7pAfAefmTpdiuhddE6/YLg7orzTqNQkF1XeNvBlgy+WdtBCOgZQdLRY+IOo9k/8XSt9ldkb8Zfbm0FdYpTHfWhuT/e4/UAAAAAAAAAAAAAAADO4D9cvzD+Ik3LBAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNy0yOFQyMjo1MjoyMiswODowMMq1zi4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDctMjhUMjI6NTI6MjIrMDg6MDC76HaSAAAASHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl83NW1saHp1bGx3NS9jbG9zZS5zdmcxNhK3AAAAAElFTkSuQmCC'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-notice-bar',
        },
        icon: {
            type: String,
            value: notice,
        },
        content: {
            type: String,
            value: '',
        },
        mode: {
            type: String,
            value: '',
        },
        action: {
            type: String,
            value: close,
        },
        loop: {
            type: Boolean,
            value: false,
        },
        leading: {
            type: Number,
            value: 500,
        },
        trailing: {
            type: Number,
            value: 800,
        },
        speed: {
            type: Number,
            value: 25,
        },
    },
    data: {
        animatedWidth: 0,
        overflowWidth: 0,
        visible: true,
    },
    computed: {
        classes() {
            const { prefixCls } = this.data
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const icon = `${prefixCls}__icon`
            const bd = `${prefixCls}__bd`
            const container = `${prefixCls}__marquee-container`
            const marquee = `${prefixCls}__marquee`
            const ft = `${prefixCls}__ft`
            const action = `${prefixCls}__action`

            return {
                wrap,
                hd,
                icon,
                bd,
                container,
                marquee,
                ft,
                action,
            }
        },
    },
    methods: {
        clearMarqueeTimer() {
            if (this.marqueeTimer) {
                clearTimeout(this.marqueeTimer)
                this.marqueeTimer = null
            }
        },
        startAnimation() {
            this.clearMarqueeTimer()
            const { overflowWidth, loop, leading, trailing, speed } = this.data
            const isLeading = this.data.animatedWidth === 0
            const timeout = isLeading ? leading : speed
            const animate = () => {
                let animatedWidth = this.data.animatedWidth + 1
                const isRoundOver = animatedWidth > overflowWidth

                // 判断是否完成一次滚动
                if (isRoundOver) {
                    if (!loop) {
                        return false
                    }
                    // 重置初始位置
                    animatedWidth = 0
                }

                // 判断是否等待一段时间后进行下一次滚动
                if (isRoundOver && trailing) {
                    setTimeout(() => {
                        this.setData({
                            animatedWidth,
                        })

                        this.marqueeTimer = setTimeout(animate, speed)
                    }, trailing)
                } else {
                    this.setData({
                        animatedWidth,
                    })
                    this.marqueeTimer = setTimeout(animate, speed)
                }
            }

            if (this.data.overflowWidth !== 0) {
                this.marqueeTimer = setTimeout(animate, timeout)
            }
        },
        initAnimation() {
            const { prefixCls } = this.data
            const query = wx.createSelectorQuery().in(this)
            query.select(`.${prefixCls}__marquee-container`).boundingClientRect()
            query.select(`.${prefixCls}__marquee`).boundingClientRect()
            query.exec((rects) => {
                if (rects.filter((n) => !n).length) return

                const [container, text] = rects
                const overflowWidth = text.width - container.width

                if (overflowWidth !== this.data.overflowWidth) {
                    this.setData({ overflowWidth }, this.startAnimation)
                }
            })
        },
        onAction() {
            if (this.data.mode === 'closable') {
                this.clearMarqueeTimer()
                this.setData({
                    visible: false
                })
            }
            this.triggerEvent('click')
        },
        onClick() {
            this.triggerEvent('click')
        },
    },
    ready() {
        this.initAnimation()
    },
    detached() {
        this.clearMarqueeTimer()
    },
})
