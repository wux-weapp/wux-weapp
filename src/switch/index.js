import { isPresetColor } from '../helpers/colors'

Component({
    externalClasses: ['wux-class'],
    behaviors: ['wx://form-field'],
    options: {
        multipleSlots: true,
    },
    data: {
        style: '',
    },
    properties: {
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
            observer(newVal) {
                this.updateStyle(isPresetColor(newVal))
            },
        },
    },
    methods: {
        onTap(e) {
            const { value, disabled } = this.data

            if (disabled) {
                return false
            }

            this.triggerEvent('change', {
                value: !value,
            })
        },
        updateStyle(color) {
            this.setData({
                style: `border-color: ${color}; background-color: ${color};`,
            })
        },
    },
    attached() {
        this.updateStyle(isPresetColor(this.data.color))
    },
})