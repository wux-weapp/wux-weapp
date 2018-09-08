const EMPTY = 'empty'
const LOADING = 'loading'
const LOADED = 'loaded'
const ERROR = 'error'
const UNMOUNTED = 'unmounted'

const calcStyle = (value) => typeof value === 'number' ? `${value}px` : value

Component({
	externalClasses: ['wux-class'],
	options: {
        multipleSlots: true,
    },
    properties: {
        src: {
            type: String,
            value: '',
            observer(newVal) {
                this.updateStatus(!!newVal ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY)
            },
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
            observer: 'updateStyle',
        },
        height: {
            type: null,
            value: 225,
            observer: 'updateStyle',
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
    methods: {
        /**
         * 更新组件样式
         */
        updateStyle(opts = {}) {
            const { width, height } = Object.assign({}, this.data, opts)
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
        this.updateStyle()
        this.updateStatus(!!this.data.src ? LOADING : this.data.unmountOnEmpty ? UNMOUNTED : EMPTY)
    },
})