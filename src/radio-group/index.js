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

baseComponent({
    useField: true,
    behaviors: [eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
        '../radio/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.changeValue)
            },
        },
    },
    properties: props,
    data: {
        inputValue: '',
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
                        const active = value === child.data.value
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
                    ? this.selectAllComponents(`.${prefixCls}__radio`)
                    : this.getRelationNodes('../radio/index')

                setChildrenValues(elements)
            })
        },
        onChange(item) {
            this.triggerEvent('change', {
                ...item,
                ...this.getValue(item.value),
                name: this.data.name,
                value: item.value, // 兼容 3.6.1 之前版本，不改变 value
            })
        },
        onRadioChange(e) {
            // Set real index
            const { index } = e.currentTarget.dataset
            this.onChange({ ...e.detail, index })
        },
        getValue(value = this.data.inputValue, cols = this.data.keys) {
            const newValue = value ? [value] : []
            const checkedValues = cols.filter((option) => newValue.includes(option.value))
            const displayValue = checkedValues.map((option) => option.title) || []
            const allValues = cols.map((option) => option.value)
            const selectedIndex = newValue.map((n) => allValues.indexOf(n))

            return {
                value,
                displayValue: displayValue[0] != null ? displayValue[0] : '',
                selectedIndex: selectedIndex[0] != null ? selectedIndex[0] : -1,
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
