Component({
    externalClasses: ['wux-class'],
    relations: {
        '../radio-group/index': {
            type: 'parent',
        },
    },
    properties: {
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
        value: {
            type: String,
            value: '',
        },
        checked: {
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
        },
    },
    methods: {
        radioChange() {
            const { value, checked, disabled } = this.data
            const parent = this.getRelationNodes('../radio-group/index')[0]
            const item = {
                checked: !checked,
                value,
            }

            if (disabled) {
                return false
            }

            parent ? parent.emitEvent(item) : this.triggerEvent('change', item)
        },
        changeValue(checked) {
            this.setData({
                checked,
            })
        },
    },
})