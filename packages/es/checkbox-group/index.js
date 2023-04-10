import baseComponent from '../helpers/baseComponent'
import eventsMixin from '../helpers/eventsMixin'
import { props } from './props'

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

function getCheckedValues(newVal, oldVal = []) {
    let checkedValues = [...oldVal]
    checkedValues = checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal]
    return checkedValues
}

baseComponent({
    useField: true,
    behaviors: [eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
        '../checkbox/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.changeValue)
            },
        },
    },
    properties: props,
    data: {
        inputValue: [],
        keys: [],
    },
    observers: {
        value(newVal) {
            if (this.hasFieldDecorator) return
            this.updated(newVal)
            this.changeValue(newVal)
        },
        inputValue(newVal) {
            if (this.hasFieldDecorator) {
                this.changeValue(newVal)
            }
        },
        ['options, disabled, readOnly, prefixCls'](options, disabled, readOnly, prefixCls) {
            this.changeValue(this.data.inputValue, options, disabled, readOnly, prefixCls)
        },
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        changeValue(
            value = this.data.inputValue,
            options = this.data.options,
            disabled = this.data.disabled,
            readOnly = this.data.readOnly,
            prefixCls = this.data.prefixCls,
        ) {
            const showOptions = getOptions(options)

            const setChildrenValues = (children) => {
                const keys = []

                if (children && children.length > 0) {
                    const lastIndex = children.length - 1
                    children.forEach((child, index) => {
                        const active = Array.isArray(value) && value.includes(child.data.value)
                        const isLast = index === lastIndex
                        child.changeValue(active, index, isLast, {
                            disabled,
                            readOnly,
                        })
                        keys.push(child.data)
                    })
                }

                if (this.data.keys !== keys) {
                    this.setData({
                        keys,
                    })
                }
            }

            wx.nextTick(() => {
                const elements = showOptions.length > 0
                    ? this.selectAllComponents(`.${prefixCls}__checkbox`)
                    : this.getRelationNodes('../checkbox/index')

                setChildrenValues(elements)
            })
        },
        onChange(item) {
            const checkedValues = getCheckedValues(item.value, this.data.inputValue)

            // 如果使用 <Field /> 组件包裹时，value 返回值为数组
            if (this.hasFieldDecorator) {
                item.value = checkedValues
            }

            this.triggerEvent('change', {
                ...this.getValue(checkedValues),
                ...item,
                name: this.data.name,
                value: item.value, // 兼容 3.6.1 之前版本，不改变 value
            })
        },
        onCheckboxChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
        getValue(value = this.data.inputValue, cols = this.data.keys) {
            // Keep sort with value
            const checkedValues = value.reduce((acc, val) => (
                [
                    ...acc,
                    ...cols.filter((option) => option.value === val),
                ]
            ), [])
            const displayValue = checkedValues.map((option) => option.title) || []
            const allValues = cols.map((option) => option.value)
            const selectedIndex = value.map((n) => allValues.indexOf(n))

            return {
                value,
                displayValue,
                selectedIndex,
                selectedValue: value,
                cols,
            }
        },
        getBoundingClientRect(callback) {
            this.cellGroup = this.cellGroup || this.selectComponent('#wux-cell-group')
            return this.cellGroup && this.cellGroup.getBoundingClientRect(callback)
        },
    },
})
