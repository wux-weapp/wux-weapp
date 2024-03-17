import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import arrayTreeFilter from '../helpers/libs/arrayTreeFilter'
import fieldNamesBehavior from '../helpers/mixins/fieldNamesBehavior'
import { props } from '../multi-picker-view/props'

baseComponent({
    behaviors: [fieldNamesBehavior],
    properties: {
        ...props,
        cols: {
            type: Number,
            value: 3,
        },
    },
    data: {
        inputValue: [],
        showOptions: [],
    },
    observers: {
        inputValue(newVal) {
            // HACK: 去掉不必要的属性，防止数据溢出
            const valueName = this.getFieldName('value')
            const labelName = this.getFieldName('label')
            const disabledName = this.getFieldName('disabled')
            const showOptions = this.getShowOptions(newVal).reduce((acc, option) => (
                [...acc, option.map((v) => ({
                    [valueName]: v[valueName],
                    [labelName]: v[labelName],
                    [disabledName]: !!v[disabledName],
                }))]
            ), [])

            this.setData({ showOptions })
        },
        ['value, options, cols'](value, options, cols) {
            this.setValue(value, options, cols)
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
        setValue(value, options, cols) {
            const inputValue = this.getRealValue(options, value, cols)
            this.updated(inputValue)
        },
        onValueChange(e) {
            const { value, index } = e.detail
            const newValue = this.getNextValue(value, index)
            const inputValue = this.getRealValue(this.data.options, newValue)
            const values = this.getValue(inputValue)

            // forceUpdate picker
            this.updated(inputValue)
            this.triggerEvent('valueChange', { ...values, index })
        },
        getValue(value = this.data.inputValue) {
            const newValue = this.getRealValue(this.data.options, Array.isArray(value) ? value : [])
            const newShowOptions = this.getShowOptions(newValue)
            this.picker = this.picker || this.querySelector('#wux-picker')
            return this.picker.getValue(newValue, newShowOptions)
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
        getRealValue(options, activeValue, cols = this.data.cols) {
            if (!activeValue || !activeValue.length || activeValue.indexOf(undefined) > -1 || activeValue.length !== cols) {
                const value = this.getFieldName('value')
                const childrenKeyName = this.getFieldName('children')

                let newValue = []
                let data = [...options]
                let i = 0

                while (i < cols) {
                    if (data && data.length) {
                        newValue[i] = activeValue[i] || data[0][value]

                        let index = 0

                        if (newValue[i]) {
                            index = data.map((v) => v[value]).indexOf(newValue[i])
                            if (index === -1) {
                                index = 0
                                newValue[i] = data[0][value]
                            }
                        }

                        data = data[index][childrenKeyName]
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
    },
    attached() {
        const { value, options, cols } = this.data

        this.setValue(value, options, cols)
    },
})
