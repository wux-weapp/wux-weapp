import baseBehavior from '../helpers/baseBehavior'
import barcode from './barcode'

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
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
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
            observer(newVal) {
                this.draw({
                    number: newVal,
                })
            },
        },
        options: {
            type: Object,
            value: defalutOptions,
        },
        canvasId: {
            type: String,
            value: 'wux-barcode',
        },
    },
    methods: {
        draw(opts = {}) {
            const { canvasId, number, width, height, options } = Object.assign({}, this.data, opts)
            new barcode(canvasId, number, Object.assign({ width, height }, options), this)
        },
    },
})