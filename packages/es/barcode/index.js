import barcode from './barcode'
import { getSystemInfoSync } from '../helpers/hooks/useNativeAPI'
import { toDataURL, getCanvasRef } from '../helpers/hooks/useCanvasAPI'

const defalutOptions = {
    number: true,
    prefix: true,
    color: 'black',
    debug: false,
    onValid() {},
    onInvalid() {},
    onSuccess() {},
    onError() {},
}

Component({
    properties: {
        width: {
            type: Number,
            value: 200,
        },
        height: {
            type: Number,
            value: 100,
        },
        number: {
            type: String,
            value: '',
        },
        options: {
            type: Object,
            value: { ...defalutOptions },
        },
        canvasId: {
            type: String,
            value: 'wux-barcode',
        },
    },
    observers: {
        ['canvasId, number, width, height, options'](...args) {
            const [
                canvasId,
                number,
                width,
                height,
                options,
            ] = args

            this.draw({
                canvasId,
                number,
                width,
                height,
                options,
            })
        },
    },
    methods: {
        draw(opts = {}) {
            const props = {
                ...this.data,
                ...opts,
            }

            const {
                canvasId,
                number: value,
                width,
                height,
                options: oldOptions,
            } = props
            
            const {
                number,
                prefix,
                color,
                debug,
            } = {
                ...defalutOptions,
                ...oldOptions,
            }

            const options = {
                number,
                prefix,
                color,
                debug,
            }
            
            getCanvasRef(canvasId, this).then((canvas) => {
                ['onValid', 'onInvalid', 'onSuccess', 'onError'].forEach((method) => {
                    const oldCb = oldOptions[method]
                    options[method] = () => {
                        if (oldCb) {
                            oldCb()
                        }
                        if (method === 'onSuccess') {
                            toDataURL({ width, height }, canvas)
                                .then((base64Url) => {
                                    const ctx = canvas.getContext('2d')
                                    ctx.restore()
                                    this.triggerEvent('load', { base64Url })
                                })
                        }
                        this.triggerEvent(method.replace(/^on/, '').toLocaleLowerCase())
                    }
                })

                new barcode(canvas, getSystemInfoSync(['window']).pixelRatio, value, Object.assign({ width, height }, options))
            })
        },
    },
})
