import baseComponent from '../helpers/baseComponent'
import eventsMixin from '../helpers/mixins/eventsMixin'
import { nextTick } from '../helpers/hooks/useNativeAPI'
import * as common from '../helpers/wxs/common'
import { props } from './props'

const fieldNames = { lable: 'title', value: 'value' }
const getOptions = (options) => common.getOptions(options, fieldNames)

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
        fieldNames,
        inputValue: [],
        keys: [],
    },
    observers: {
        value(newVal) {
            if (this.hasFieldDecorator) return
            this.updated(newVal)
            this.changeValue({ value: newVal })
        },
        inputValue(newVal) {
            if (this.hasFieldDecorator) {
                this.changeValue({ value: newVal })
            }
        },
        ['options, disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls'](...args) {
            const [
                options,
                disabled,
                readOnly,
                hasLine,
                withListComponent,
                iconPosition,
                iconSize,
                iconOn,
                iconOff,
                prefixCls,
            ] = args
            this.changeValue({
                value: this.data.inputValue,
                options,
                disabled,
                readOnly,
                hasLine,
                withListComponent,
                iconPosition,
                iconSize,
                iconOn,
                iconOff,
                prefixCls,
            })
        },
    },
    methods: {
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        changeValue(props = {}) {
            const {
                value,
                options,
                disabled,
                readOnly,
                hasLine,
                withListComponent,
                iconPosition,
                iconSize,
                iconOn,
                iconOff,
                prefixCls,
            } = {
                ...this.data,
                value: this.data.inputValue,
                ...props,
            }

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
                            hasLine,
                            // 如果使用 <Field /> 组件包裹时，子组件的 hasLine 属性无效
                            hasFieldDecorator: !!this.hasFieldDecorator,
                            withListComponent,
                            iconPosition,
                            iconSize,
                            iconOn,
                            iconOff,
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

            nextTick(() => {
                const elements = showOptions.length > 0
                    ? this.querySelectorAll(`.${prefixCls}__checkbox`)
                    : this.getRelationsByName('../checkbox/index')

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
            this.cellGroup = this.cellGroup || this.querySelector('#wux-cell-group')
            return this.cellGroup && this.cellGroup.getBoundingClientRect(callback)
        },
    },
})
