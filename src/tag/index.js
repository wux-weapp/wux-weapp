import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

/**
 * 判断是否预设的颜色值
 * @param {String} color 颜色值
 */
const isPresetColor = (color) => {
    if (!color) {
        return false
    }
    return (/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color))
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-tag',
        },
        hoverClass: {
            type: String,
            value: 'default',
        },
        color: {
            type: String,
            value: '',
            observer: 'updateStyle',
        },
        closable: {
            type: Boolean,
            value: false,
        },
        defaultVisible: {
            type: Boolean,
            value: true,
        },
        visible: {
            type: Boolean,
            value: true,
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
    },
    data: {
        className: '',
        tagStyle: '',
        tagVisible: true,
    },
    computed: {
        classes() {
            const { prefixCls, hoverClass } = this.data
            const wrap = classNames(prefixCls)
            const icon = `${prefixCls}__icon`
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                icon,
                hover,
            }
        },
    },
    methods: {
        /**
         * 控制组件显示或隐藏
         */
        updated(tagVisible) {
            if (this.data.tagVisible !== tagVisible) {
                this.setData({
                    tagVisible,
                })
            }
        },
        /**
         * 更新组件样式
         */
        updateStyle(color) {
            const { prefixCls } = this.data
            const isPreset = isPresetColor(color)
            const className = isPreset ? `${prefixCls}--${color}` : ''
            const tagStyle = !isPreset ? `background-color: ${color}; color: #fff` : ''

            this.setData({
                className,
                tagStyle,
            })
        },
        /**
         * 显示隐藏的回调
         */
        onChange(tagVisible) {
            if (!this.data.controlled) {
                this.updated(tagVisible)
            }

            this.triggerEvent('change', { value: tagVisible })
        },
        /**
         * 点击事件
         */
        onClick() {
            this.triggerEvent('click')
        },
        /**
         * 关闭时触发的回调函数
         */
        onClose() {
            if (this.data.closable) {
                this.triggerEvent('close')
                this.onChange(false)
            }
        },
    },
    attached() {
        const { defaultVisible, visible, controlled } = this.data
        const tagVisible = controlled ? visible : defaultVisible

        this.updated(tagVisible)
    },
})