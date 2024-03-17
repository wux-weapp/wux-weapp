import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { getCanvasRef, toDataURL, createImage, downloadImage } from '../helpers/hooks/useCanvasAPI'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-water-mark',
        },
        content: {
            optionalTypes: [Array, String],
            type: String,
            value: '',
        },
        fontColor: {
            type: String,
            value: 'rgba(0, 0, 0, .15)',
        },
        fontStyle: {
            type: String,
            value: 'normal',
        },
        fontFamily: {
            type: String,
            value: 'sans-serif',
        },
        fontWeight: {
            type: String,
            value: 'normal',
        },
        fontSize: {
            type: Number,
            value: 14,
        },
        fullPage: {
            type: Boolean,
            value: true,
        },
        gapX: {
            type: Number,
            value: 24,
        },
        gapY: {
            type: Number,
            value: 48,
        },
        width: {
            type: Number,
            value: 120,
        },
        height: {
            type: Number,
            value: 64,
        },
        image: {
            type: String,
            value: '',
        },
        imageHeight: {
            type: Number,
            value: 64,
        },
        imageWidth: {
            type: Number,
            value: 128,
        },
        rotate: {
            type: Number,
            value: -22,
        },
        zIndex: {
            type: Number,
            value: 2000,
        },
    },
    data: {
        wrapStyle: '',
        base64Url: '',
    },
    observers: {
        ['zIndex, gapX, width, base64Url'](...args) {
            this.updateStyle(...args)
        },
        ['prefixCls, gapX, gapY, rotate, fontStyle, fontWeight, width, height, fontFamily, fontColor, image, imageWidth, imageHeight, content, fontSize'](...args) {
            this.setBase64Url(...args)
        },
    },
    computed: {
        classes: ['prefixCls, fullPage', function(prefixCls, fullPage) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--full-page`]: fullPage,
            })
            const canvas = `${prefixCls}__canvas`

            return {
                wrap,
                canvas,
            }
        }],
    },
    methods: {
        setBase64Url(...args) {
            const [
                prefixCls,
                gapX,
                gapY,
                rotate,
                fontStyle,
                fontWeight,
                width,
                height,
                fontFamily,
                fontColor,
                image,
                imageWidth,
                imageHeight,
                content,
                fontSize,
            ] = args

            this.createCanvasContext({
                prefixCls,
                gapX,
                gapY,
                rotate,
                fontStyle,
                fontWeight,
                width,
                height,
                fontFamily,
                fontColor,
                image,
                imageWidth,
                imageHeight,
                content,
                fontSize,
            })
        },
        createCanvasContext(props) {
            const {
                prefixCls,
                gapX,
                gapY,
                rotate,
                fontStyle,
                fontWeight,
                width,
                height,
                fontFamily,
                fontColor,
                image,
                imageWidth,
                imageHeight,
                content,
                fontSize,
            } = props
            const setBase64Url = (base64Url) => {
                if (props.base64Url !== base64Url) {
                    this.setData({
                        base64Url,
                    })
                    this.triggerEvent('load', { base64Url })
                }
            }
            const canvasId = `${prefixCls}__canvas`
            const renderCanvas = (imageUrl) => getCanvasRef(canvasId, this).then((canvas) => {
                const ctx = canvas.getContext('2d')
                const ratio = getSystemInfoSync(['window']).pixelRatio
                const canvasWidth = (gapX + width) * ratio
                const canvasHeight = (gapY + height) * ratio
                const markWidth = width * ratio
                const markHeight = height * ratio

                canvas.width = canvasWidth
                canvas.height = canvasHeight

                if (imageUrl) {
                    ctx.translate(markWidth / 2, markHeight / 2)
                    ctx.rotate((Math.PI / 180) * Number(rotate))

                    return createImage({
                        imageWidth,
                        imageHeight,
                        imageUrl,
                    }, canvas).then(() => (
                        toDataURL({ width, height }, canvas)
                            .then((base64Url) => {
                                ctx.restore()
                                return base64Url
                            })
                    ))
                } else if (content) {
                    ctx.textBaseline = 'middle'
                    ctx.textAlign = 'center'
                    ctx.translate(markWidth / 2, markHeight / 2)
                    ctx.rotate((Math.PI / 180) * Number(rotate))

                    const markSize = Number(fontSize) * ratio
                    ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`
                    ctx.fillStyle = fontColor
                    if (Array.isArray(content)) {
                        content.forEach((item, index) =>
                            ctx.fillText(item, 0, index * markSize)
                        )
                    } else {
                        ctx.fillText(content, 0, 0)
                    }
                    return toDataURL({ width, height }, canvas)
                        .then((base64Url) => {
                            ctx.restore()
                            return base64Url
                        })
                }
            })

            let promise = Promise.resolve()

            if (image) {
                promise = promise.then(() => downloadImage(image))
            }

            promise = promise.then((imageUrl) => {
                return renderCanvas(imageUrl)
            })

            promise = promise.then((base64Url) => {
                setBase64Url(base64Url)
            }, (err) => {
                this.triggerEvent('error', err)
                // console.error(err)
            })

            return promise
        },
        updateStyle(zIndex, gapX, width, base64Url) {
            const wrapStyle = styleToCssString({
                zIndex,
                backgroundSize: `${gapX + width}px`,
                backgroundImage: base64Url ? `url('${base64Url}')` : 'unset',
            })
            this.setData({
                wrapStyle,
            })
        },
    },
    ready() {
        const { zIndex, gapX, width, base64Url } = this.data
        this.updateStyle(zIndex, gapX, width, base64Url)
        this.createCanvasContext(this.data)
    },
})
