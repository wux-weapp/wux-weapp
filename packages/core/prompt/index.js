
import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-prompt',
        },
        classNames: {
            type: null,
            value: 'wux-animate--fadeIn',
        },
        icon: {
            type: String,
            value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfgCxwAHyE2vHbUAAACWUlEQVRo3u2ZP2gTcRTHP7EpBTOJWrDSxdZBxE0yCC3UdilqUBCs4B8ogVfr0EnQ6lAEsylIXR6moFA1g6IoSAct7WhxUBQFsS5aLDgWcWitLjG5y11zufxyl8Hfd8n7vd+79z738svvfkfAysrqf1fC3609jHGYtnDJJBEuHiDpU7yNAkfj6sAmH990fOV9ADTN8fjK+3VA4izvB9AfL4B3EbY67E75Vn9qHeSCHAzfgQZJIU+f7moaAPvpAC7FAKAnPJ6EprkOQFbP6OZIAbSdgna5PEf4wSt6i8O7/NRx3RZdB84B4y7PGFsrYq7RExGAppgAhnV72ScDdDFVGi7ST4s8jqoD/77/UadTvkiW0wB8pltmZX3jBEYAmizd6YSmKiYfATAStLGadWDAYQ+5p+QXF4G5oBQGANrObccwr50VAXmG5HdQFs8RQpfoKA023Ip1N5c563E/5Qrvwj3NkqGiAU2Q5gYHfCczZPio55mvtuyMADTDHbZUDdnDLOhJKbiu+1O23Qe3sGsgFVC+HFejQgLIA1ro40OVkGUO0SpTtWYM/SuQdZljL/t44jM5T5od8lzWas8XehECCLznmO7kDc6HTLcshs9lsA/IEsOO4Wg95U13whmHPV1fCiMAWWWkaOZkpQkAwP3i52S9CQwBZIUccE+WmwQA3AKu1n+5MYB8JyufmggAte96EQGYyQJYAAtgASyA90y46rC/ahM68DLiigtBAFHfdC4AQBZ4GGH5tzwL6gCc8n3paIRe01v52trQ/wuqaI0X3JQZ80RWVlYN11+uNXxr6IunHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMS0yOFQwMDozMTozMyswODowMBHRiXcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTEtMjhUMDA6MzE6MzMrMDg6MDBgjDHLAAAAAElFTkSuQmCC',
        },
        title: {
            type: String,
            value: '',
        },
        text: {
            type: String,
            value: '',
        },
        buttons: {
            type: Array,
            value: [],
        },
        visible: {
            type: Boolean,
            value: false,
        },
    },
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
        onError(e) {
            this.triggerEvent('error', {...e.detail, ...e.currentTarget.dataset })
        },
    },
})
