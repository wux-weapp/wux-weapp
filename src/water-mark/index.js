import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

const downImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        if (
            /^http/.test(imageUrl) &&
            // @ts-ignore
            !/^http:\/\/tmp/.test(imageUrl)
        ) {
            wx.downloadFile({
                url: imageUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.tempFilePath)
                    } else {
                        reject(res.errMsg)
                    }
                },
                fail(err) {
                    reject(err)
                },
            })
        } else {
            // 支持本地地址
            resolve(imageUrl)
        }
    })
}

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
                }
            }
            const renderCanvas = (imageUrl) => new Promise((resolve, reject) => {
                const canvasId = `${prefixCls}__canvas`
                const query = wx.createSelectorQuery().in(this)
                query.select(`#${canvasId}`)
                    .fields({ node: true, size: true })
                    .exec((res) => {
                        if (!res[0]) {
                            reject('Canvas is not supported in the current environment.')
                            return
                        }
    
                        const canvas = res[0].node
                        const ctx = canvas.getContext('2d')
                        const ratio = wx.getSystemInfoSync().pixelRatio
                        const canvasWidth = (gapX + width) * ratio
                        const canvasHeight = (gapY + height) * ratio
                        const markWidth = width * ratio
                        const markHeight = height * ratio
    
                        canvas.width = canvasWidth
                        canvas.height = canvasHeight
                        
                        if (imageUrl) {
                            ctx.translate(markWidth / 2, markHeight / 2)
                            ctx.rotate((Math.PI / 180) * Number(rotate))
    
                            const img = canvas.createImage()
                            img.onload = () => {
                                ctx.drawImage(
                                    img,
                                    (-imageWidth * ratio) / 2,
                                    (-imageHeight * ratio) / 2,
                                    imageWidth * ratio,
                                    imageHeight * ratio
                                )
                                ctx.restore()
                                resolve(canvas.toDataURL())
                            }
                            img.onerror = () => {
                                reject('Image creation failed.')
                            }
                            img.src = imageUrl
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
                            ctx.restore()
                            resolve(canvas.toDataURL())
                        }
                    })
            })

            let promise = Promise.resolve()

            if (image) {
                promise = promise.then(() => {
                    return downImage(image).catch(() => {
                        return Promise.reject('Image download failed.')
                    })
                })
            }

            promise = promise.then((imageUrl) => {
                return renderCanvas(imageUrl)
            })

            promise = promise.then((base64Url) => {
                setBase64Url(base64Url)
            }, (errMsg) => {
                console.error(errMsg)
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
