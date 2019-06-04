import baseComponent from '../helpers/baseComponent'

baseComponent({
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
    },
    computed: {
        classes: ['prefixCls, transparent', function(prefixCls, transparent) {
            const wrap = transparent ? `${prefixCls}--transparent` : prefixCls

            return {
                wrap,
            }
        }],
    },
    methods: {
        /**
         * 保持锁定
         */
        retain() {
            if (typeof this.backdropHolds !== 'number' || !this.backdropHolds) {
                this.backdropHolds = 0
            }

            this.backdropHolds = this.backdropHolds + 1

            if (this.backdropHolds === 1) {
                this.setData({ in: true })
            }
        },
        /**
         * 释放锁定
         */
        release() {
            if (this.backdropHolds === 1) {
                this.setData({ in: false })
            }
            this.backdropHolds = Math.max(0, this.backdropHolds - 1)
        },
        /**
         * 点击事件
         */
        onClick() {
            this.triggerEvent('click')
        },
    },
})
