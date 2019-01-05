import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    externalClasses: ['wux-class-badge'],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-badge',
        },
        count: {
            type: Number,
            value: 0,
            observer: 'updated',
        },
        overflowCount: {
            type: Number,
            value: 99,
        },
        dot: {
            type: Boolean,
            value: false,
        },
        showZero: {
            type: Boolean,
            value: false,
        },
        status: {
            type: String,
            value: '',
        },
        text: {
            type: String,
            value: '',
        },
    },
    data: {
        finalCount: 0,
    },
    computed: {
        classes() {
            const { prefixCls, status: st } = this.data
            const wrap = classNames(prefixCls)
            const status = `${prefixCls}__status`
            const statusDot = classNames(`${prefixCls}__status-dot`, {
                [`${prefixCls}__status-dot--${st}`]: st,
            })
            const statusText = `${prefixCls}__status-text`
            const dot = `${prefixCls}__dot`
            const count = `${prefixCls}__count`

            return {
                wrap,
                status,
                statusDot,
                statusText,
                dot,
                count,
            }
        },
    },
    methods: {
        updated(count = this.data.count) {
            const { overflowCount } = this.data
            const finalCount = count >= overflowCount ? `${overflowCount}+` : count

            this.setData({
                finalCount,
            })
        },
    },
})