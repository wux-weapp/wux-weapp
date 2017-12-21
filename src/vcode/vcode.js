export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            num: 6,
            width: 120,
            height: 40,
            bgColor: undefined,
            fontColor: undefined,
            hasPoint: true,
            hasLine: true,
        }
    },
    /**
     * 获取范围内的随机数
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    },
    /**
     * 获取范围内的随机颜色值
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     */
    randomColor(min, max) {
        const _r = this.randomNum(min, max)
        const _g = this.randomNum(min, max)
        const _b = this.randomNum(min, max)
        return `rgb(${_r}, ${_g}, ${_b})`
    },
    /**
     * 创建 canvas 绘图上下文
     * @param {String} id canvas 组件的唯一标识符
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
    draw(id, opts = {}) {
        const { str, num, width, height, bgColor, fontColor, hasPoint, hasLine } = opts
        const ctx = wx.createCanvasContext(id)

        const render = () => {
            let vcode = ''
            if (typeof ctx.setTextBaseline === 'function') {
                ctx.setTextBaseline('bottom')
            }

            // 绘制矩形，并设置填充色
            ctx.setFillStyle(bgColor ? bgColor : this.randomColor(180, 240))
            ctx.fillRect(0, 0, width, height)

            // 绘制随机生成 n 位的验证码
            for (let i = 0; i < num; i++) {
                const x = (width - 10) / num * i + 10
                const y = this.randomNum(height / 2, height)
                const deg = this.randomNum(-45, 45)
                const txt = str[this.randomNum(0, str.length)]
                const fontSize = this.randomNum(16, 40)
                const halfHeight = parseInt(height / 2)

                vcode += txt
                ctx.setFillStyle(fontColor ? fontColor : this.randomColor(10, 100))
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
                    ctx.setStrokeStyle(this.randomColor(90, 180))
                    ctx.beginPath()
                    ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height))
                    ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height))
                    ctx.stroke()
                }
            }

            // 绘制干扰点
            if (!!hasPoint) {
                for (let i = 0; i < num * 10; i++) {
                    ctx.setFillStyle(this.randomColor(0, 255))
                    ctx.beginPath()
                    ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI)
                    ctx.fill()
                }
            }

            return vcode
        }

        return {
            /**
             * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
             * @param {Boolean} reserve 本次绘制是否接着上一次绘制，默认值 false
             * @param {Function} callback 绘制完成后回调
             */
            draw(reserve = false, callback = () => {}) {
                ctx.clearRect(0, 0, width, height)
                const vcode = render()
                ctx.draw(reserve, () => callback(vcode))
            },
        }
    },
    /**
     * 绘制验证码
     * @param {String} id canvas 组件的唯一标识符
     * @param {Object} opts 配置项
     */
    init(id, opts = {}) {
        const options = Object.assign({ id }, this.setDefaults(), opts)
        return this.draw(id, options)
    },
}