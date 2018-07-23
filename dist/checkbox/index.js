import { isPresetColor } from '../helpers/colors'

Component({
    externalClasses: ['wux-class'],
    relations: {
        '../checkbox-group/index': {
            type: 'parent',
        },
    },
    properties: {
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        extra: {
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
            value: 'balanced',
            observer(newVal) {
                this.setData({
                    checkboxColor: isPresetColor(newVal),
                })
            },
        },
    },
    methods: {
        checkboxChange() {
            const { value, checked, disabled } = this.data
            const parent = this.getRelationNodes('../checkbox-group/index')[0]
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
    attached() {
        this.setData({
            checkboxColor: isPresetColor(this.data.color),
        })
    },
})