import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import arrayTreeFilter from '../helpers/arrayTreeFilter'
import { defaultFieldNames, props } from '../picker-view/props'

baseComponent({
    properties: {
        ...props,
        pickerPrefixCls: {
            type: String,
            value: 'wux-picker',
        },
        cols: {
            type: Number,
            value: 3,
        },
    },
    data: {
        inputValue: [],
        showOptions: [],
        fieldNames: defaultFieldNames,
    },
    observers: {
        inputValue(newVal) {
            const showOptions = this.getShowOptions(newVal)
            this.setData({
                showOptions,
            })
        },
        ['value, options, cols'](value, options, cols) {
            this.setValue(value)
        },
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({
                    inputValue,
                })
            }
        },
        setValue(value = this.data.inputValue) {
            const inputValue = this.getRealValue(this.data.options, value)
            this.updated(inputValue)
        },
        onChange(e) {
            const { value, changedIndex } = e.detail
            const newValue = this.getNextValue(value, changedIndex)
            const inputValue = this.getRealValue(this.data.options, newValue)
            const showOptions = this.getShowOptions(inputValue)
            const values = this.getValue(inputValue, showOptions)

            // forceUpdate picker
            this.updated(inputValue)
            this.triggerEvent('change', { ...values, changedIndex })
        },
        getValue(value = this.data.inputValue, showOptions = this.data.showOptions) {
            this.picker = this.picker || this.selectComponent('#wux-picker')
            return this.picker.getValue(value, showOptions)
        },
        getNextValue(activeValue, index) {
            const { options } = this.data
            const value = this.getFieldName('value')
            const childrenKeyName = this.getFieldName('children')
            const children = arrayTreeFilter(options, (option, level) => level <= index && option[value] === activeValue[level], { childrenKeyName })

            let data = children[index]
            let i = index + 1

            while (i < this.data.cols) {
                if (data && data[childrenKeyName] && data[childrenKeyName].length) {
                    data = data[childrenKeyName][0]
                    activeValue[i] = data[value]
                }
                i++
            }

            activeValue.length = i

            return activeValue
        },
        getRealValue(options = this.data.options, activeValue) {
            if (!activeValue || !activeValue.length || activeValue.indexOf(undefined) > -1 || activeValue.length !== this.data.cols) {
                const value = this.getFieldName('value')
                const childrenKeyName = this.getFieldName('children')

                let newValue = []
                let data = [...options]
                let i = 0

                while (i < this.data.cols) {
                    if (data && data.length) {
                        newValue[i] = activeValue[i] || data[0][value]
                        data = data[0][childrenKeyName]
                    }
                    i++
                }

                return newValue
            }

            return activeValue
        },
        getActiveOptions(activeValue) {
            const { options } = this.data
            const value = this.getFieldName('value')
            const childrenKeyName = this.getFieldName('children')

            return arrayTreeFilter(options, (option, level) => option[value] === activeValue[level], { childrenKeyName })
        },
        getShowOptions(activeValue) {
            const { options, cols } = this.data
            const children = this.getFieldName('children')
            const result = this.getActiveOptions(activeValue).map((activeOption) => activeOption[children]).filter((activeOption) => !!activeOption)

            return [options, ...result].filter((_, i) => i < cols)
        },
        getFieldName(name) {
            return this.data.fieldNames[name]
        },
    },
    attached() {
        const { value } = this.data
        const fieldNames = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)

        this.setData({ fieldNames })
        this.setValue(value)
    },
})
