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
            value: '#09BB07',
            observer: 'updateStyle',
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
        updateStyle(newVal = this.data.color) {
            this.setData({
                style: `border-color: ${newVal}; background-color: ${newVal};`,
            })
        },
    },
    attached() {
        this.updateStyle()
    },
})