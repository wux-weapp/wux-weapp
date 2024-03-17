import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { toDataURL, getCanvasRef } from '../helpers/hooks/useCanvasAPI'

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
 * @param {Object} props 配置项
 * @param {String} props.str 验证码范围
 * @param {Number} props.num 验证码长度，默认值 6
 * @param {Number} props.width 画布宽度，默认值 120
 * @param {Number} props.height 画布高度，默认值 40
 * @param {String} props.bgColor 画布背景色
 * @param {String} props.fontColor 画布字体颜色
 * @param {Boolean} props.hasPoint 是否显示干扰点，默认 true
 * @param {Boolean} props.hasLine 是否显示干扰线，默认 true
 */
const render = (ctx, props = {}) => {
    const { str, num, width, height, bgColor, fontColor, hasPoint, hasLine } = props
    const ratio = getSystemInfoSync(['window']).pixelRatio
    let vcode = ''

    // 绘制矩形，并设置填充色
    ctx.textBaseline = 'bottom'
    ctx.fillStyle = bgColor ? bgColor : randomColor(180, 240)
    ctx.scale(ratio, ratio)
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
        ctx.fillStyle = fontColor ? fontColor : randomColor(10, 100)
        ctx.font = `normal normal normal ${fontSize > halfHeight ? halfHeight : fontSize}px sans-serif`
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
    }

    // 绘制干扰线
    if (!!hasLine) {
        for (let i = 0; i < num; i++) {
            ctx.strokeStyle = randomColor(90, 180)
            ctx.beginPath()
            ctx.moveTo(randomNum(0, width), randomNum(0, height))
            ctx.lineTo(randomNum(0, width), randomNum(0, height))
            ctx.stroke()
        }
    }

    // 绘制干扰点
    if (!!hasPoint) {
        for (let i = 0; i < num * 10; i++) {
            ctx.fillStyle = randomColor(0, 255)
            ctx.beginPath()
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

    return vcode
}

Component({
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
        createCanvasContext(props) {
            const { width, height, canvasId } = props
            const setBase64Url = ({ value, base64Url }) => {
                this.triggerEvent('change', { value, base64Url })
            }
            const renderCanvas = () => getCanvasRef(canvasId, this).then((canvas) => {
                const ctx = canvas.getContext('2d')
                const ratio = getSystemInfoSync(['window']).pixelRatio
                const canvasWidth = width * ratio
                const canvasHeight = height * ratio

                canvas.width = canvasWidth
                canvas.height = canvasHeight
    
                const value = render(ctx, props)
                return toDataURL({ width, height }, canvas)
                    .then((base64Url) => {
                        ctx.restore()
                        return { value, base64Url }
                    })
            })

            let promise = Promise.resolve()

            promise = promise.then(() => {
                return renderCanvas()
            })

            promise = promise.then(({ value, base64Url }) => {
                setBase64Url({ value, base64Url })
            }, (err) => {
                this.triggerEvent('error', err)
                // console.error(err)
            })

            return promise
        },
        draw() {
            this.createCanvasContext(this.data)
        },
    },
    ready() {
        this.createCanvasContext(this.data)
    },
})
