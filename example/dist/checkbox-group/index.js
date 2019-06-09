import baseComponent from '../helpers/baseComponent'

baseComponent({
    useField: true,
    useEvents: true,
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
        '../checkbox/index': {
            type: 'child',
            observer() {
                this.debounce(this.changeValue)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-checkbox-group',
        },
        cellGroupPrefixCls: {
            type: String,
            value: 'wux-cell-group',
        },
        value: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.hasFieldDecorator) return
                this.updated(newVal)
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
        options: {
            type: Array,
            value: [],
        },
    },
    data: {
        inputValue: [],
    },
    observers: {
        inputValue(newVal) {
            if (this.hasFieldDecorator) {
                this.changeValue(newVal)
            }
        },
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        changeValue(value = this.data.inputValue) {
            const { options } = this.data
            const elements = this.getRelationNodes('../checkbox/index')

            if (options.length > 0) return
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(Array.isArray(value) && value.includes(element.data.value), index)
                })
            }
        },
        onChange(item) {
            if (this.hasFieldDecorator) {
                let checkedValues = [...this.data.inputValue]
                checkedValues = checkedValues.indexOf(item.value) !== -1 ? checkedValues.filter((n) => n !== item.value) : [...checkedValues, item.value]
                item.value = checkedValues
            }

            this.emitEvent('change', { ...item, name: this.data.name })
        },
        onCheckboxChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
    },
})
