import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    useField: true,
    useEvents: true,
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
        '../radio/index': {
            type: 'child',
            observer() {
                this.debounce(() => {
                    const { inputValue, value } = this.data
                    this.changeValue(this.hasFieldDecorator ? inputValue : value)
                })
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-radio-group',
        },
        cellGroupPrefixCls: {
            type: String,
            value: 'wux-cell-group',
        },
        value: {
            type: String,
            value: '',
            observer(newVal) {
                if (this.hasFieldDecorator) return
                this.changeValue(newVal)
            },
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
    },
    data: {
        inputValue: '',
    },
    observers: {
        inputValue(newVal) {
            if (this.hasFieldDecorator) {
                this.changeValue(newVal)
            }
        },
    },
    methods: {
        changeValue(value = this.data.value) {
            const elements = this.getRelationNodes('../radio/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(value === element.data.value, index)
                })
            }
        },
        onChange(item) {
            this.emitEvent('change', { ...item, name: this.data.name })
        },
    },
})
