import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { isPresetColor } from '../helpers/colors'

baseComponent({
    useField: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-switch',
        },
        value: {
            type: Boolean,
            value: false,
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        color: {
            type: String,
            value: 'balanced',
            observer: 'updateStyle',
        },
    },
    data: {
        style: '',
    },
    computed: {
        classes() {
            const { prefixCls, value, disabled } = this.data
            const wrap = classNames(prefixCls)
            const input = classNames(`${prefixCls}__input`, {
                [`${prefixCls}__input--checked`]: value,
                [`${prefixCls}__input--disabled`]: disabled,
            })

            return {
                wrap,
                input,
            }
        },
    },
    methods: {
        onTap(e) {
            const { value, disabled } = this.data

            if (disabled) return

            this.triggerEvent('change', {
                value: !value,
            })
        },
        updateStyle(color = this.data.color) {
            const newColor = isPresetColor(color)
            this.setData({
                style: `border-color: ${newColor}; background-color: ${newColor};`,
            })
        },
    },
    attached() {
        this.updateStyle()
    },
})
