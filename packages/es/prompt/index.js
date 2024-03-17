
import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { props } from './props'

baseComponent({
    properties: props,
    computed: {
        classes: ['prefixCls, buttons', function(prefixCls, btns) {
            const wrap = classNames(prefixCls)
            const button = btns.map((button) => {
                const wrap = classNames(`${prefixCls}__button`, {
                    [`${prefixCls}__button--disabled`]: button.disabled,
                    [`${button.className}`]: button.className,
                })
                const hover = button.hoverClass && button.hoverClass !== 'default' ? button.hoverClass : `${prefixCls}__button--hover`

                return {
                    wrap,
                    hover,
                }
            })
            const bd = `${prefixCls}__bd`
            const icon = `${prefixCls}__icon`
            const title = `${prefixCls}__title`
            const buttons = `${prefixCls}__buttons`

            return {
                wrap,
                button,
                bd,
                icon,
                title,
                buttons,
            }
        }],
    },
    methods: {
        /**
         * 点击按钮触发事件
         */
        onTap(e) {
            const { buttons } = this.data
            const { index } = e.currentTarget.dataset
            const value = this.data.buttons[index]

            if (value.disabled) return

            this.triggerEvent('click', { index, value, buttons })
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', {...e.detail, ...e.currentTarget.dataset })
        },
        bindcontact(e) {
            this.triggerEvent('contact', {...e.detail, ...e.currentTarget.dataset })
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', {...e.detail, ...e.currentTarget.dataset })
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', {...e.detail, ...e.currentTarget.dataset })
        },
        bindlaunchapp(e) {
            this.triggerEvent('launchapp', {...e.detail, ...e.currentTarget.dataset })
        },
        bindchooseavatar(e) {
            this.triggerEvent('chooseavatar', {...e.detail, ...e.currentTarget.dataset })
        },
        onError(e) {
            this.triggerEvent('error', {...e.detail, ...e.currentTarget.dataset })
        },
    },
})
