import baseComponent from '../helpers/baseComponent'
import { toDataURL, getCanvasRef } from '../helpers/hooks/useCanvasAPI'
import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { useRef } from '../helpers/hooks/useDOM'
import styleToCssString from '../helpers/libs/styleToCssString'
import { getTouchPoints } from '../helpers/shared/gestures'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-e-sign',
        },
        type: {
            type: String,
            value: 'png',
        },
        width: {
            type: [String, Number],
            value: 'auto',
        },
        height: {
            type: Number,
            value: 200,
        },
        bgColor: {
            type: String,
            value: '#ffffff',
        },
        lineWidth: {
            type: Number,
            value: 3,
        },
        lineColor: {
            type: String,
            value: '#000000',
        },
        hasFooter: {
            type: Boolean,
            value: true,
        },
        cancelText: {
            type: String,
            value: '重置',
        },
        confirmText: {
            type: String,
            value: '确定',
        },
    },
    data: {
        isCanvasEmpty: true,
        bodyStyle: '',
    },
    observers: {
        ['width, height, bgColor'](width, height, bgColor) {
            this.setBodyStyle({
                width,
                height,
            })

            this.resize({
                ...this.data,
                width,
                height,
                bgColor,
            })
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const bd = `${prefixCls}__bd`
            const ft = `${prefixCls}__ft`
            const button = `${prefixCls}__button`

            return {
                wrap: prefixCls,
                bd,
                ft,
                button,
            }
        }],
    },
    methods: {
        /**
         * 手指触摸动作开始
         */
        onTouchStart(e) {            
            if (!this.canvasRef) {
                return false
            }
            
            const props = this.data

            this.canvasRef.then(({ value: ctx }) => {
                ctx.beginPath()
                ctx.lineWidth = props.lineWidth || 3
                ctx.strokeStyle = props.lineColor || '#000000'

                this.triggerEvent('start')
            })
        },
        /**
         * 手指触摸后移动
         */
        onTouchMove(e) {
            if (!this.canvasRef) {
                return false
            }

            if (this.data.isCanvasEmpty) {
                this.setData({ isCanvasEmpty: false })
            }

            const touch = getTouchPoints(e)
            const mouseX = touch.x - (e.currentTarget.offsetLeft || 0)
            const mouseY = touch.y - (e.currentTarget.offsetTop || 0)

            this.canvasRef.then(({ value: ctx }) => {
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
                ctx.lineTo(mouseX, mouseY)
                ctx.stroke()

                this.triggerEvent('signing', { mouseX, mouseY })
            })
        },
        /**
         * 手指触摸动作结束
         */
        onTouchEnd(e) {
            if (this.data.isCanvasEmpty) {
                this.setData({ isCanvasEmpty: false })
            }
            this.triggerEvent('end')
        },
        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
         */
        createCanvasContext(props) {
            const getWrapRef = () => {
                if (props.width === 'auto') {
                    return useRef(`.${props.prefixCls}__bd`, this)
                }
                return Promise.resolve({
                    clientWidth: props.width,
                    clientHeight: props.height,
                })
            }
            const renderCanvas = () => {
                return getWrapRef().then(({ clientWidth: width, clientHeight: height }) => {
                    return getCanvasRef(props.prefixCls, this).then((canvas) => {
                        const ctx = canvas.getContext('2d')
                        const ratio = getSystemInfoSync(['window']).pixelRatio
                        const canvasWidth = width * ratio
                        const canvasHeight = height * ratio
                        const setCanvasBgColor = (ctx) => {
                            if (ctx && props.bgColor) {
                                ctx.fillStyle = props.bgColor
                                ctx.fillRect(0, 0, width, height)
                            }
                        }
        
                        canvas.width = canvasWidth
                        canvas.height = canvasHeight
        
                        ctx.scale(ratio, ratio)
                        setCanvasBgColor(ctx)
        
                        const clear = () => {
                            ctx.clearRect(0, 0, width, height)
                            ctx.closePath()
                            // reset canvas bgColor
                            setCanvasBgColor(ctx)
                        }
        
                        const draw = () => {
                            return toDataURL({ width, height, type: props.type }, canvas)
                        }
        
                        const resize = (createCanvasContext) => {
                            const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
                            createCanvasContext().then(({ value: newCtx }) => {
                                newCtx.putImageData(data, 0, 0)
                            })
                        }
        
                        return { value: ctx, clear, draw, resize }
                    })
                })
            }

            return Promise.resolve().then(renderCanvas)
        },
        setBodyStyle(props) {
            const bodyStyle = styleToCssString({
                width: props.width === 'auto' ? 'auto' : `${props.width}px`,
                height: `${props.height}px`,
            })

            if (this.data.bodyStyle !== bodyStyle) {
                this.setData({
                    bodyStyle,
                })
            }
        },
        clear() {
            if (this.canvasRef) {
                this.canvasRef.then(({ clear }) => {
                    clear()
                    this.setData({ isCanvasEmpty: true })
                    this.triggerEvent('clear')
                })
            }
        },
        submit() {
            if (this.data.isCanvasEmpty) {
                this.triggerEvent('submit', { base64Url: '' })
            } else if (this.canvasRef) {
                this.canvasRef.then(({ draw }) => {
                    draw().then((base64Url) => this.triggerEvent('submit', { base64Url }))
                })
            }
        },
        resize() {
            if (this.canvasRef) {
                this.canvasRef.then(({ resize }) => {
                    resize(() => {
                        this.canvasRef = this.createCanvasContext(this.data)
                        return this.canvasRef
                    })
                })
            }
        },
        ['export']() {
            return {
                resize: this.resize.bind(this),
            }
        },
    },
    ready() {
        this.setBodyStyle(this.data)
        this.canvasRef = this.createCanvasContext(this.data)
    },
})
