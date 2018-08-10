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
    data: {
        index: 0,
    },
    methods: {
        checkboxChange() {
            const { value, checked, index, disabled } = this.data
            const parent = this.getRelationNodes('../checkbox-group/index')[0]
            const item = {
                checked: !checked,
                value,
                index,
            }

            if (disabled) {
                return false
            }

            parent ? parent.emitEvent(item) : this.triggerEvent('change', item)
        },
        changeValue(checked = false, index = 0) {
            this.setData({
                checked,
                index,
            })
        },
    },
    attached() {
        this.setData({
            checkboxColor: isPresetColor(this.data.color),
        })
    },
})