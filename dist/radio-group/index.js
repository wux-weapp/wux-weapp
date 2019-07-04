import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
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
            const elements = this.getRelationNodes('../radio/index')
            const keys = showOptions.length > 0 ? showOptions : elements ? elements.map((element) => element.data) : []

            // Elements should be updated when not using the options
            if (!showOptions.length && elements && elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(value === element.data.value, index)
                })
            }

            if (this.data.keys !== keys) {
                this.setData({
                    keys,
                })
            }
        },
        onChange(item) {
            this.triggerEvent('change', { ...item, name: this.data.name })
        },
        onRadioChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
        getValue() {
            const { value, keys: options } = this.data
            const checkedValues = options.filter((option) => value === option.value)
            const displayValue = checkedValues.map((option) => option.title)[0] || ''
            return { value, displayValue, options }
        },
        getBoundingClientRect(callback) {
            this.cellGroup = this.cellGroup || this.selectComponent('#wux-cell-group')
            return this.cellGroup && this.cellGroup.getBoundingClientRect(callback)
        },
    },
})
