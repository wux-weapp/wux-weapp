import baseComponent from '../helpers/baseComponent'
import eventsMixin from '../helpers/eventsMixin'

function getOptions(options = []) {
    return options.map((option, index) => {
        if (typeof option === 'string') {
            return {
                title: option,
                value: option,
                index,
            }
        }
        return {
            ...option,
            index,
        }
    })
}

baseComponent({
    useField: true,
    behaviors: [eventsMixin()],
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
        keys: [],
    },
    observers: {
        ['value, options'](value, options) {
            this.changeValue(value, options)
        },
    },
    methods: {
        changeValue(value = this.data.value, options = this.data.options) {
            const showOptions = getOptions(options)
            const elements = this.getRelationNodes('../checkbox/index')
            const keys = showOptions.length > 0 ? showOptions : elements ? elements.map((element) => element.data) : []

            // Elements should be updated when not using the options
            if (!showOptions.length && elements && elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(Array.isArray(value) && value.includes(element.data.value), index)
                })
            }

            if (this.data.keys !== keys) {
                this.setData({
                    keys,
                })
            }
        },
        onChange(item) {
            if (this.hasFieldDecorator) {
                let checkedValues = [...this.data.value]
                checkedValues = checkedValues.indexOf(item.value) !== -1 ? checkedValues.filter((n) => n !== item.value) : [...checkedValues, item.value]
                item.value = checkedValues
            }

            this.triggerEvent('change', { ...item, name: this.data.name })
        },
        onCheckboxChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
        getValue() {
            const { value, keys: options } = this.data
            const checkedValues = options.filter((option) => value.includes(option.value))
            const displayValue = checkedValues.map((option) => option.title) || []
            return { value, displayValue, options }
        },
        getBoundingClientRect(callback) {
            this.cellGroup = this.cellGroup || this.selectComponent('#wux-cell-group')
            return this.cellGroup && this.cellGroup.getBoundingClientRect(callback)
        },
    },
})
