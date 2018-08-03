import baseBehavior from '../helpers/baseBehavior'
import qrjs from './qr.js/index'

/**
 * 字符串转换成 UTF-8
 * @param {String} str 文本内容
 */
const utf16to8 = (str) => {
    const len = str.length
    let out = ''

    for (let i = 0; i < len; i++) {
        const c = str.charCodeAt(i)

        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }

    return out
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        typeNumber: {
            type: Number,
            value: -1,
            observer(newVal) {
                this.draw({
                    typeNumber: newVal,
                })
            },
        },
        errorCorrectLevel: {
            type: Number,
            value: 2,
            observer(newVal) {
                this.draw({
                    errorCorrectLevel: newVal,
                })
            },
        },
        width: {
            type: Number,
            value: 200,
            observer(newVal) {
                this.draw({
                    width: newVal,
                })
            },
        },
        height: {
            type: Number,
            value: 200,
            observer(newVal) {
                this.draw({
                    height: newVal,
                })
            },
        },
        fgColor: {
            type: String,
            value: 'black',
            observer(newVal) {
                this.draw({
                    fgColor: newVal,
                })
            },
        },
        bgColor: {
            type: String,
            value: 'white',
            observer(newVal) {
                this.draw({
                    bgColor: newVal,
                })
            },
        },
        canvasId: {
            type: String,
            value: 'wux-qrcode',
        },
        data: {
            type: String,
            value: '',
            observer(newVal) {
                this.draw({
                    data: newVal,
                })
            },
        },
    },
    methods: {
        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
         */
        draw(opts = {}) {
            const { typeNumber, errorCorrectLevel, width, height, fgColor, bgColor, canvasId, data } = Object.assign({}, this.data, opts)
            const qrcode = qrjs(utf16to8(data), {
                typeNumber,
                errorCorrectLevel,
            })
            const cells = qrcode.modules
            const tileW = width / cells.length
            const tileH = height / cells.length

            this.ctx = this.ctx || wx.createCanvasContext(canvasId, this)
            this.ctx.scale(1, 1)

            cells.forEach((row, rdx) => {
                row.forEach((cell, cdx) => {
                    this.ctx.setFillStyle(cell ? fgColor : bgColor)
                    const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
                    const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
                    this.ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
                })
            })

            this.ctx.draw()
        },
        /**
         * 手指触摸后马上离开
         */
        onTap() {
            this.triggerEvent('tap')
        },
    },
    attached() {
        this.draw()
    },
    detached() {
        this.ctx = null
    },
})