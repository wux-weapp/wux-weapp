import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'
import { defaultFieldNames, props } from './props'

function getStyles(value) {
    return Array.isArray(value) ? value.map((n) => styleToCssString(n)) : styleToCssString(value)
}

function getChangedIndexes(oldValue = [], newValue = [], length = 1) {
    if (length === 1) return [0]
    const result = []
    let i = 0
    while (i < length) {
        if (oldValue[i] !== newValue[i]) {
            result.push(i)
        }
        i++
    }
    return result
}

function getRealIndex(value = 0, min = 0, max) {
    if (value <= min) {
        return min
    }
    if (value >= max) {
        return max
    }
    return value
}

function getRealIndexes(indexes = [], cols = []) {
    return cols.reduce((acc, col, idx) => {
        return [...acc, getRealIndex(indexes[idx], 0, col.length - 1)]
    }, [])
}

function getRealValues(values = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.reduce((acc, col, idx) => {
        const colValues = col.map((v) => v[fieldNames.value])
        const value = values[idx] !== undefined && colValues.includes(values[idx]) ? values[idx] : colValues[0]
        return value !== undefined ? [...acc, value] : acc
    }, [])
}

function set(acc = [], name, index, values, func) {
    return [...acc, func(values[index], name)]
}

function getIndexFromValue(value, col = [], fieldNames = defaultFieldNames) {
    return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value), 0, col.length - 1)
}

function getIndexesFromValues(values = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.reduce((acc, col, idx) => {
        return set(acc, col, idx, values, (...args) => getIndexFromValue(...args, fieldNames))
    }, [])
}

function getValueFromIndex(index, col = [], fieldNames = defaultFieldNames) {
    const item = col[getRealIndex(index, 0, col.length - 1)]
    return item ? item[fieldNames.value] : null
}

function getValuesFromIndexes(indexes = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.reduce((acc, col, idx) => {
        return set(acc, col, idx, indexes, (...args) => getValueFromIndex(...args, fieldNames))
    }, [])
}

function isMultiPicker(data = []) {
    if (!data) { return false }
    return Array.isArray(data[0])
}

function getRealCols(data = [], fieldNames = defaultFieldNames) {
    const cols = isMultiPicker(data) ? data : [data]
    return cols.reduce((acc, col) => {
        const value = col.map((v) => {
            if (typeof v !== 'object') {
                return { [fieldNames.value]: v, [fieldNames.label]: v }
            }
            return v
        })
        return [...acc, value]
    }, [])
}

baseComponent({
    properties: props,
    data: {
        inputValue: [],
        selectedIndex: [],
        selectedValue: [],
        cols: [],
        extIndicatorStyle: '',
        extItemStyle: '',
        extMarkStyle: '',
        fieldNames: defaultFieldNames,
    },
    computed: {
        classes: ['prefixCls, labelAlign', function(prefixCls, labelAlign) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${labelAlign}`]: labelAlign,
            })
            const cols = `${prefixCls}__cols`
            const col = `${prefixCls}__col`
            const item = `${prefixCls}__item`

            return {
                wrap,
                cols,
                col,
                item,
            }
        }],
    },
    observers: {
        value(newVal) {
            if (this.data.controlled) {
                this.setValue(newVal)
            }
        },
        itemStyle(newVal) {
            this.setData({
                extItemStyle: getStyles(newVal),
            })
        },
        indicatorStyle(newVal) {
            this.setData({
                extIndicatorStyle: getStyles(newVal),
            })
        },
        maskStyle(newVal) {
            this.setData({
                extMarkStyle: getStyles(newVal),
            })
        },
        options(newVal) {
            this.setData({
                cols: getRealCols(newVal, this.data.fieldNames),
            }, () => {
                this.setValue(this.data.inputValue, true)
            })
        },
        inputValue(newVal) {
            const {
                selectedIndex,
                selectedValue,
            } = this.getValue(newVal)

            this.setData({
                selectedIndex,
                selectedValue,
            })
        },
    },
    methods: {
        updated(inputValue, isForce) {
            if (this.data.inputValue !== inputValue || isForce) {
                this.setData({
                    inputValue,
                })
            }
        },
        setValue(value, isForce) {
            const { value: inputValue } = this.getValue(value)
            this.updated(inputValue, isForce)
        },
        fixAndScroll(values) {
            const { inputValue: oldValue, cols } = this.data
            const { value: newValue, selectedIndex } = values
            const changedIndexes = this.getChangedIndexes(oldValue, newValue)
            const hasChanged = changedIndexes.length > 0

            if (hasChanged) {
                changedIndexes.forEach((v) => {
                    const index = selectedIndex[v]
                    const col = cols[v]
                    const item = col && col[index]

                    if (item && item.disabled) {
                        newValue[v] = oldValue[v]
                    }
                })

                return this.getValue(newValue)
            }

            return values
        },
        onChange(e) {
            const { controlled, cols, fieldNames, useValueProp, inputValue: oldValue } = this.data
            const { value } = e.detail
            const newValue = !useValueProp ? value : getValuesFromIndexes(value, cols, fieldNames)
            const values = this.fixAndScroll(this.getValue(newValue))
            const changedIndex = this.getChangedIndexes(oldValue, newValue)[0]
            const changedItem = cols[changedIndex] && cols[changedIndex][value[changedIndex]]
            const isUpdated = changedItem && changedItem.disabled

            // 判断当前变化的元素是否为禁用状态，是则重置到原来的位置
            if (!controlled || isUpdated) {
                this.updated(values.value, isUpdated)
            }

            // 判断是否触发 change 事件
            if (!isUpdated) {
                this.triggerEvent('change', { ...values, changedIndex })
            }
        },
        onBeforeChange(e) {
            this.triggerEvent('beforeChange', this.getValue())
        },
        onAfterChange(e) {
            this.triggerEvent('afterChange', this.getValue())
        },
        getChangedIndexes(oldValue = this.data.inputValue, newValue) {
            return getChangedIndexes(oldValue, newValue, this.data.cols.length)
        },
        getValue(value = this.data.inputValue, cols = this.data.cols) {
            const { fieldNames, useValueProp } = this.data
            const inputValue = !useValueProp ? getRealIndexes(value, cols) : getRealValues(value, cols, fieldNames)
            const selectedValue = !useValueProp ? getValuesFromIndexes(inputValue, cols, fieldNames) : [...inputValue]
            const selectedIndex = !useValueProp ? [...inputValue] : getIndexesFromValues(inputValue, cols, fieldNames)
            const displayValue = this.getFieldMeta(selectedIndex, fieldNames.label, cols)

            return {
                value: inputValue,
                displayValue,
                selectedIndex,
                selectedValue,
                cols,
            }
        },
        getFieldMeta(indexes, member, cols = this.data.cols) {
            return cols.reduce((acc, col, idx) => {
                const item = col[indexes[idx]]
                return [...acc, member ? item && item[member] : item]
            }, [])
        },
    },
    attached() {
        const { defaultValue, value, controlled, options } = this.data
        const inputValue = controlled ? value : defaultValue
        const fieldNames = Object.assign({}, defaultFieldNames, this.data.defaultFieldNames)
        const cols = getRealCols(options, fieldNames)

        this.setData({ cols, fieldNames }, () => this.setValue(inputValue))
    },
})
