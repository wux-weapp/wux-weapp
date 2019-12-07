import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const EMPTY = 'empty'
const LOADING = 'loading'
const LOADED = 'loaded'
const ERROR = 'error'
const UNMOUNTED = 'unmounted'

const calcStyle = (value) => typeof value === 'number' ? `${value}px` : value

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-image',
        },
        src: {
            type: String,
            value: '',
        },
        mode: {
            type: String,
            value: 'scaleToFill',
        },
        lazyLoad: {
            type: Boolean,
            value: false,
        },
        shape: {
            type: String,
            value: 'normal',
        },
        width: {
            type: null,
            value: 300,
        },
        height: {
            type: null,
            value: 225,
        },
        unmountOnEmpty: {
            type: Boolean,
            value: false,
        },
        unmountOnError: {
            type: Boolean,
            value: false,
        },
        empty: {
            type: String,
            value: '',
        },
        loading: {
            type: String,
            value: '',
        },
        error: {
            type: String,
            value: '',
        },
    },
    data: {
        status: '',
    },
    computed: {
        classes: ['prefixCls, shape, mode, status, empty, loading, error', function(prefixCls, shape, mode, status, empty, loading, error) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${shape}`]: shape,
                [`${prefixCls}--${mode}`]: mode,
                [`${prefixCls}--${status}`]: status,
            })
            const inner = `${prefixCls}__inner`
            const thumb = `${prefixCls}__thumb`
            const mask = classNames(`${prefixCls}__mask`, {
                [`${prefixCls}__mask--text`]: empty || loading || error,
            })
            const text = `${prefixCls}__text`

            return {
                wrap,
                inner,
                thumb,
                mask,
                text,
            }
        }],
    },
    observers: {
        src(newVal) {
            this.updated(newVal)
        },
        ['width, height'](...args) {
            this.updateStyle(...args)
        },
    },
    methods: {
        /**
         * 更新资源地址
         */
        updated(src) {
            this.updateStatus(!!src ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY)
        },
        /**
         * 更新组件样式
         */
        updateStyle(width, height) {
            const style = `width: ${calcStyle(width)}; height: ${calcStyle(height)}`

            this.setData({
                style,
            })
        },
        /**
         * 更新组件状态
         */
        updateStatus(status) {
            if (this.data.status !== status) {
                this.setData({
                    status,
                })
            }

            this.triggerEvent('change', { status })
        },
        /**
         * 资源加载完成时的回调函数
         */
        onLoad(e) {
            this.updateStatus(LOADED)
            this.triggerEvent('load', { ...e.detail, status: LOADED })
        },
        /**
         * 资源加载失败时的回调函数
         */
        onError(e) {
            const status = this.data.unmountOnError ? UNMOUNTED : ERROR
            this.updateStatus(status)
            this.triggerEvent('error', { ...e.detail, status })
        },
        /**
         * 点击事件
         */
        onTap(e) {
            this.triggerEvent('click', { ...e.detail, status: this.data.status })
        },
    },
    attached() {
        const { width, height, src } = this.data
        this.updateStyle(width, height)
        this.updated(src)
    },
})
