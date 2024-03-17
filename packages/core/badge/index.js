import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'

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
        position: {
            type: String,
            value: 'topRight',
        },
        backgroundColor: {
            type: String,
            value: '#ed3f14',
        },
        hideShadow: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
    },
    data: {
        finalCount: 0,
        badgeStyle: '',
    },
    observers: {
        ['count, overflowCount'](count, overflowCount) {
            this.updated({
                count,
                overflowCount,
            })
        },
        backgroundColor(newVal) {
            this.updateStyle(newVal)
        },
    },
    computed: {
        classes: ['prefixCls, position, hideShadow, status', function(prefixCls, position, hideShadow, st) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--position-${position}`]: position,
                [`${prefixCls}--hide-shadow`]: hideShadow,
            })
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
        }],
    },
    methods: {
        updated(props = this.data) {
            const { count, overflowCount } = props
            const finalCount = count >= overflowCount ? `${overflowCount}+` : count

            this.setData({
                finalCount,
            })
        },
        updateStyle(backgroundColor) {
            const badgeStyle = styleToCssString({
                backgroundColor,
            })
            
            if (badgeStyle !== this.data.badgeStyle) {
                this.setData({
                    badgeStyle,
                })
            }
        },
    },
})
