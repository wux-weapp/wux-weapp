import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const toAngle = (a) => a / 180 * Math.PI
const percent = (a) => toAngle(a / 100 * 360)
const easeInOutCubic = (a, b, c, d) => {
    a /= d / 2
    if (a < 1) return c / 2 * a * a * a + b
    a -= 2
    return c / 2 * (a * a * a + 2) + b
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-circle',
        },
        percent: {
            type: Number,
            value: 0,
            observer: 'redraw',
        },
        strokeWidth: {
            type: Number,
            value: 10,
        },
        size: {
            type: Number,
            value: 120,
            observer: 'updateStyle',
        },
        lineCap: {
            type: String,
            value: 'round',
        },
        backgroundColor: {
            type: String,
            value: '#f3f3f3',
        },
        color: {
            type: String,
            value: '#33cd5f',
        },
        sAngle: {
            type: Number,
            value: 0,
            observer(newVal) {
                this.setData({
                    beginAngle: toAngle(newVal),
                })
            },
        },
        counterclockwise: {
            type: Boolean,
            value: false,
        },
        speed: {
            type: Number,
            value: 2000,
        },
        animate: {
            type: Boolean,
            value: true,
        },
        background: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        beginAngle: 0,
        startAngle: 0,
        endAngle: 0,
        currentAngle: 0,
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const inner = `${prefixCls}__inner`

            return {
                wrap,
                inner,
            }
        }],
    },
    methods: {
        /**
         * 更新样式
         */
        updateStyle(size = this.data.size) {
            const style = `width: ${size}px; height: ${size}px;`

            this.setData({
                style,
            })
        },
        /**
         * 着帧绘制 canvas
         */
        redraw(value = this.data.percent) {
            const endAngle = percent(value)
            const now = Date.now()
            const decrease = this.data.currentAngle > endAngle
            const startAngle = !decrease ? this.data.currentAngle : this.data.endAngle

            this.cancelNextCallback()
            this.clearTimer()

            this.safeSetData({ startAngle, endAngle }, () => {
                this.animate(now, now, decrease)
            })
        },
        /**
         * 绘制 canvas
         */
        draw(line = true) {
            const { lineCap, backgroundColor, color, size, strokeWidth, counterclockwise, background } = this.data
            const position = size / 2
            const radius = position - strokeWidth / 2
            const p = 2 * Math.PI
            const startAngle = counterclockwise ? p - this.data.beginAngle : this.data.beginAngle
            const endAngle = counterclockwise ? p - (this.data.beginAngle + this.data.currentAngle) : this.data.beginAngle + this.data.currentAngle

            // 创建 canvas 绘图上下文
            this.ctx = this.ctx || wx.createCanvasContext('circle', this)

            // 清除画布
            this.ctx.clearRect(0, 0, size, size)

            // 绘制背景
            if (background) {
                this.ctx.beginPath()
                this.ctx.arc(position, position, radius, 0, 2 * Math.PI)
                this.ctx.setLineWidth(strokeWidth)
                this.ctx.setStrokeStyle(backgroundColor)
                this.ctx.stroke()
            }

            // 绘制进度
            if (line) {
                this.ctx.beginPath()
                this.ctx.arc(position, position, radius, startAngle, endAngle)
                this.ctx.setLineWidth(strokeWidth)
                this.ctx.setStrokeStyle(color)
                this.ctx.setLineCap(lineCap)
                this.ctx.stroke()
            }

            // 绘制完成
            this.ctx.draw(false, () => {
                this.triggerEvent('change', { value: this.data.currentAngle })
            })
        },
        /**
         * 开始动画
         */
        animate(c, d, e) {
            const now = Date.now()
            const f = now - c < 1 ? 1 : now - c
            const { animate, speed, startAngle, endAngle } = this.data
            const isEnd = !e && 1000 * this.data.currentAngle <= Math.floor(1000 * endAngle) || e && 1000 * this.data.currentAngle >= Math.floor(1000 * endAngle)

            if (animate && c - d < 1.05 * speed && isEnd) {
                const value = easeInOutCubic((c - d) / f, startAngle, endAngle - startAngle, speed / f)
                const currentAngle = value < 0 ? 0 : value

                c = Date.now()

                this.safeSetData({ currentAngle }, () => {
                    this.draw(currentAngle !== 0)
                    this.timer = setTimeout(() => this.animate(c, d, e), 1000 / 60)
                })
            } else {
                this.safeSetData({ currentAngle: endAngle }, () => this.draw(endAngle !== 0))
            }
        },
        /**
         * 清除定时器
         */
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },
    },
    attached() {
        this.updateStyle()
        if (this.data.percent === 0) {
            this.draw(false)
        }
    },
    detached() {
        this.ctx = null
        this.clearTimer()
    },
})
