import baseComponent from '../helpers/baseComponent'

baseComponent({
    useExport: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-backdrop',
        },
        transparent: {
            type: Boolean,
            value: false,
        },
        zIndex: {
            type: Number,
            value: 1000,
        },
        classNames: {
            type: null,
            value: 'wux-animate--fadeIn',
        },
        mountOnEnter: {
            type: Boolean,
            value: true,
        },
        unmountOnExit: {
            type: Boolean,
            value: true,
        },
        visible: {
            type: Boolean,
            value: false,
            observer(newVal) {
                this.setActive(newVal)
                if (!newVal) {
                    this._backdropHolds = 0
                }
            },
        },
    },
    data: {
        active: false,
    },
    computed: {
        classes: ['prefixCls, transparent', function(prefixCls, transparent) {
            const wrap = transparent ? `${prefixCls}--transparent` : prefixCls
            const bd = `${prefixCls}__bd`
            const btn = `${prefixCls}__aria-btn`

            return {
                wrap,
                bd,
                btn,
            }
        }],
    },
    methods: {
        /**
         * 设置组件是否可见
         */
        setActive(active) {
            if (this.data.active !== active) {
                this.setData({
                    active,
                })
            }
        },
        /**
         * 完全展示后触发
         */
        onEntered() {
            this.triggerEvent('showed')
        },
        /**
         * 完全关闭后触发
         */
        onExited() {
            this.triggerEvent('closed')
        },
        /**
         * 点击事件
         */
        onClick() {
            this.triggerEvent('click')
        },
        /**
         * 阻止冒泡
         */
        noop() {},
        ['export']() {
            const self = this

            /**
             * 保持锁定
             */
            const retain = () => {
                if (typeof this._backdropHolds !== 'number' || !this._backdropHolds) {
                    this._backdropHolds = 0
                }

                this._backdropHolds = this._backdropHolds + 1

                if (this._backdropHolds === 1) {
                    this.setActive(true)
                }
            }

            /**
             * 释放锁定
             */
            const release = () => {
                if (this._backdropHolds === 1) {
                    this.setActive(false)
                }
                this._backdropHolds = Math.max(0, this._backdropHolds - 1)
            }

            return {
                retain,
                release,
                get backdropHolds() {
                    return self._backdropHolds || 0
                },
            }
        },
    },
    attached() {
        const { visible: active } = this.data
        this.setActive(active)
    },
})
