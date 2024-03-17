import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { toDataURL, getCanvasRef } from '../helpers/hooks/useCanvasAPI'

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

baseComponent({
    useExport: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-qrcode',
        },
        typeNumber: {
            type: Number,
            value: -1,
        },
        errorCorrectLevel: {
            type: Number,
            value: 2,
        },
        width: {
            type: Number,
            value: 200,
        },
        height: {
            type: Number,
            value: 200,
        },
        whiteSpace: {
            type: Number,
            value: 0,
        },
        fgColor: {
            type: String,
            value: 'black',
        },
        bgColor: {
            type: String,
            value: 'white',
        },
        data: {
            type: String,
            value: '',
        },
        showMenuByLongpress: {
            type: Boolean,
            value: false,
        },
        qrcodeStatus: {
            type: String,
            value: 'activated',
        },
        qrcodeExpiredText: {
            type: String,
            value: '二维码过期',
        },
        qrcodeRefreshText: {
            type: String,
            value: '点击刷新',
        },
    },
    data: {
        wrapStyle: '',
        base64Url: '',
    },
    observers: {
        ['height, width'](height, width) {
            this.updateStyle(height, width)
        },
        ['prefixCls, typeNumber, errorCorrectLevel, width, height, whiteSpace, fgColor, bgColor, data'](...args) {
            this.setBase64Url(...args)
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const canvas = `${prefixCls}__canvas`
            const image = `${prefixCls}__image`
            const mask = `${prefixCls}__mask`
            const expired = `${prefixCls}__expired`
            const refresh = `${prefixCls}__refresh`
            const icon = `${prefixCls}__icon`

            return {
                wrap,
                canvas,
                image,
                mask,
                expired,
                refresh,
                icon,
            }
        }],
    },
    methods: {
        updateStyle(height, width) {
            const wrapStyle = styleToCssString({
                height: `${height}px`,
                width: `${width}px`,
            })
            this.setData({
                wrapStyle,
            })
        },
        setBase64Url(...args) {
            const [
                prefixCls,
                typeNumber,
                errorCorrectLevel,
                width,
                height,
                whiteSpace,
                fgColor,
                bgColor,
                data,
            ] = args

            this.createCanvasContext({
                prefixCls,
                typeNumber,
                errorCorrectLevel,
                width,
                height,
                whiteSpace,
                fgColor,
                bgColor,
                data,
            })
        },
        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
         */
        createCanvasContext(props) {
            const {
                prefixCls,
                typeNumber,
                errorCorrectLevel,
                width,
                height,
                whiteSpace,
                fgColor,
                bgColor,
                data,
            } = props
            const qrcode = qrjs(utf16to8(data), {
                typeNumber,
                errorCorrectLevel,
            })
            const cells = qrcode.modules
            const tileW = (width - whiteSpace * 2) / cells.length
            const tileH = (height - whiteSpace * 2) / cells.length
            const setBase64Url = (base64Url) => {
                if (props.base64Url !== base64Url) {
                    this.setData({
                        base64Url,
                    })
                    this.triggerEvent('load', { base64Url })
                }
            }
            const canvasId = `${prefixCls}__canvas`
            const renderCanvas = () => getCanvasRef(canvasId, this).then((canvas) => {
                // always cache node
                this.canvas = canvas

                const ctx = canvas.getContext('2d')
                const ratio = getSystemInfoSync(['window']).pixelRatio
                const canvasWidth = width * ratio
                const canvasHeight = height * ratio

                canvas.width = canvasWidth
                canvas.height = canvasHeight

                ctx.scale(ratio, ratio)
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, width, height)

                cells.forEach((row, rdx) => {
                    row.forEach((cell, cdx) => {
                        ctx.fillStyle = cell ? fgColor : bgColor
                        const x = Math.round(cdx * tileW) + whiteSpace
                        const y = Math.round(rdx * tileH) + whiteSpace
                        const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
                        const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
                        ctx.fillRect(x, y, w, h)
                    })
                })

                return toDataURL({ width, height }, canvas)
                    .then((base64Url) => {
                        ctx.restore()
                        return base64Url
                    })
            })

            let promise = Promise.resolve()

            promise = promise.then(() => {
                return renderCanvas()
            })

            promise = promise.then((base64Url) => {
                setBase64Url(base64Url)
            }, (err) => {
                this.triggerEvent('error', err)
                // console.error(err)
            })

            return promise
        },
        /**
         * 手指触摸后马上离开
         */
        onTap() {
            this.triggerEvent('click')
        },
        /**
         * 蒙层的点击事件
         */
        onMaskClick() {
            if (this.data.qrcodeStatus === 'expired') {
                this.triggerEvent('refresh')
            }
        },
        ['export']() {
            const getCanvasNode = () => {
                return this.canvas
            }
            const getBase64Url = () => {
                return this.data.base64Url
            }

            return {
                getCanvasNode,
                getBase64Url,
            }
        },
    },
    ready() {
        const { height, width } = this.data
        this.updateStyle(height, width)
        this.createCanvasContext(this.data)
    },
})
