import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-alert',
        },
        classNames: {
            type: null,
            value: 'wux-animate--fadeIn',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        closable: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        visible: true,
    },
    computed: {
        classes() {
            const { prefixCls, theme } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            })
            const hd = `${prefixCls}__hd`
            const thumb = `${prefixCls}__thumb`
            const bd = `${prefixCls}__bd`
            const text = `${prefixCls}__text`
            const desc = `${prefixCls}__desc`
            const ft = `${prefixCls}__ft`
            const closable = `${prefixCls}__closable`

            return {
                wrap,
                hd,
                thumb,
                bd,
                text,
                desc,
                ft,
                closable,
            }
        },
    },
    methods: {
        /**
         * 关闭时触发的回调函数
         */
        onClose() {
            if (this.data.closable) {
                this.setData({
                    visible: false
                })
            }
            this.triggerEvent('click')
        },
        /**
         * 点击事件
         */
        onClick() {
            this.triggerEvent('click')
        },
    },
})