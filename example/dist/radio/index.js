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
            observer(newVal) {
                this.setData({
                    inputChecked: newVal,
                })
            },
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        color: {
            type: String,
            value: 'balanced',
        },
    },
    data: {
        index: 0,
        inputChecked: false,
    },
    methods: {
        radioChange(e) {
            const { value, index, disabled } = this.data
            const parent = this.getRelationNodes('../radio-group/index')[0]
            const item = {
                checked: e.detail.checked,
                value,
                index,
            }

            if (disabled) return

            parent ? parent.emitEvent(item) : this.triggerEvent('change', item)
        },
        changeValue(inputChecked = false, index = 0) {
            this.setData({
                inputChecked,
                index,
            })
        },
    },
})