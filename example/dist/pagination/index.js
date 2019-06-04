import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-pagination',
        },
        mode: {
            type: String,
            value: 'button',
        },
        defaultCurrent: {
            type: Number,
            value: 1,
        },
        current: {
            type: Number,
            value: 1,
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        total: {
            type: Number,
            value: 0,
        },
        simple: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeIndex: 1,
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const prev = `${prefixCls}__prev`
            const button = `${prefixCls}__button`
            const number = `${prefixCls}__number`
            const active = `${prefixCls}__active`
            const pointer = `${prefixCls}__pointer`
            const dot = `${prefixCls}__dot`
            const next = `${prefixCls}__next`

            return {
                wrap,
                prev,
                button,
                number,
                active,
                pointer,
                dot,
                next,
            }
        }],
    },
    methods: {
        updated(activeIndex) {
            if (this.data.activeIndex !== activeIndex) {
                this.setData({
                    activeIndex,
                })
            }
        },
        onChange(current, type) {
            if (!this.data.controlled) {
                this.updated(current)
            }

            this.triggerEvent('change', {
                current,
                type,
            })
        },
    	onPrev() {
            this.onChange(this.data.activeIndex - 1, 'prev')
        },
        onNext() {
            this.onChange(this.data.activeIndex + 1, 'next')
        },
    },
    attached() {
        const { defaultCurrent, current, controlled } = this.data
        const activeIndex = controlled ? current : defaultCurrent

        this.updated(activeIndex)
    },
})
