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

Component({
    externalClasses: ['wux-class', 'wux-hover-class'],
    properties: {
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
    methods: {
        updated(tagVisible) {
            if (this.data.tagVisible !== tagVisible) {
                this.setData({
                    tagVisible,
                })
            }
        },
        updateStyle(color) {
            const isPreset = isPresetColor(color)
            const className = isPreset ? `wux-tag--${color}` : ''
            const tagStyle = !isPreset ? `background-color: ${color}; color: #fff` : ''

            this.setData({
                className,
                tagStyle,
            })
        },
        onChange(tagVisible) {
            if (!this.data.controlled) {
                this.updated(tagVisible)
            }

            this.triggerEvent('change', { value: tagVisible })
        },
        onClick() {
            this.triggerEvent('click')
        },
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