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
                this.debounce(this.changeValue)
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
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        changeValue(value = this.data.inputValue) {
            const { options } = this.data
            const elements = this.getRelationNodes('../radio/index')

            if (options.length > 0) return
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(value === element.data.value, index)
                })
            }
        },
        onChange(item) {
            this.emitEvent('change', { ...item, name: this.data.name })
        },
        onRadioChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
    },
})
