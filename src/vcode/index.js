import baseBehavior from '../helpers/baseBehavior'

/**
 * 获取范围内的随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 获取范围内的随机颜色值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
const randomColor = (min, max) => {
    const _r = randomNum(min, max)
    const _g = randomNum(min, max)
    const _b = randomNum(min, max)
    return `rgb(${_r}, ${_g}, ${_b})`
}

/**
 * 创建 canvas 绘图上下文
 * @param {Object} ctx canvas 绘图上下文
 * @param {Object} opts 配置项
 * @param {String} opts.str 验证码范围
 * @param {Number} opts.num 验证码长度，默认值 6
 * @param {Number} opts.width 画布宽度，默认值 120
 * @param {Number} opts.height 画布高度，默认值 40
 * @param {String} opts.bgColor 画布背景色
 * @param {String} opts.fontColor 画布字体颜色
 * @param {Boolean} opts.hasPoint 是否显示干扰点，默认 true
 * @param {Boolean} opts.hasLine 是否显示干扰线，默认 true
 */
const render = (ctx, opts = {}) => {
    const { str, num, width, height, bgColor, fontColor, hasPoint, hasLine } = opts
    let vcode = ''

    if (typeof ctx.setTextBaseline === 'function') {
        ctx.setTextBaseline('bottom')
    }

    // 绘制矩形，并设置填充色
    ctx.setFillStyle(bgColor ? bgColor : randomColor(180, 240))
    ctx.fillRect(0, 0, width, height)

    // 绘制随机生成 n 位的验证码
    for (let i = 0; i < num; i++) {
        const x = (width - 10) / num * i + 10
        const y = randomNum(height / 2, height)
        const deg = randomNum(-45, 45)
        const txt = str[randomNum(0, str.length)]
        const fontSize = randomNum(16, 40)
        const halfHeight = parseInt(height / 2)

        vcode += txt
        ctx.setFillStyle(fontColor ? fontColor : randomColor(10, 100))
        ctx.setFontSize(fontSize > halfHeight ? halfHeight : fontSize)
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
    }

    // 绘制干扰线
    if (!!hasLine) {
        for (let i = 0; i < num; i++) {
            ctx.setStrokeStyle(randomColor(90, 180))
            ctx.beginPath()
            ctx.moveTo(randomNum(0, width), randomNum(0, height))
            ctx.lineTo(randomNum(0, width), randomNum(0, height))
            ctx.stroke()
        }
    }

    // 绘制干扰点
    if (!!hasPoint) {
        for (let i = 0; i < num * 10; i++) {
            ctx.setFillStyle(randomColor(0, 255))
            ctx.beginPath()
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

    return vcode
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        str: {
            type: String,
            value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        },
        num: {
            type: Number,
            value: 6,
        },
        width: {
            type: Number,
            value: 120,
        },
        height: {
            type: Number,
            value: 40,
        },
        bgColor: {
            type: String,
            value: '',
        },
        fontColor: {
            type: String,
            value: '',
        },
        hasPoint: {
            type: Boolean,
            value: true,
        },
        hasLine: {
            type: Boolean,
            value: true,
        },
        canvasId: {
            type: String,
            value: 'wux-vcode',
        },
    },
    methods: {
        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
         */
        draw() {
            const { width, height, canvasId } = this.data
            this.ctx = this.ctx || wx.createCanvasContext(canvasId, this)
            this.ctx.clearRect(0, 0, width, height)
            const value = render(this.ctx, this.data)
            this.ctx.draw(false, () => this.triggerEvent('change', { value }))
        },
    },
    attached() {
        this.draw()
    },
    detached() {
        this.ctx = null
    },
})