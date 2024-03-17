import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import shallowEqual from '../helpers/libs/shallowEqual'
import fieldNamesBehavior from '../helpers/mixins/fieldNamesBehavior'
import { props } from './props'
import {
    getRealCols,
    getRealValues,
    getIndexesFromValues,
    getLabelsFromIndexes,
} from './utils'

baseComponent({
    behaviors: [fieldNamesBehavior],
    properties: props,
    data: {
        inputValue: [],
        cols: [],
    },
    observers: {
        ['value, options'](value, options) {
            const fieldNames = this.getFieldNames()
            const cols = getRealCols(options, fieldNames)

            if (!shallowEqual(this.data.cols, cols)) {
                this.setData({ cols })
            }

            this.setValue(value, true)
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
        getValue(value = this.data.inputValue, cols = this.data.cols) {
            const fieldNames = this.getFieldNames()
            const inputValue = getRealValues(Array.isArray(value) ? value : [], cols, fieldNames)
            const selectedValue = [...inputValue]
            const selectedIndex = getIndexesFromValues(inputValue, cols, fieldNames)
            const displayValue = getLabelsFromIndexes(selectedIndex, cols, fieldNames.label)

            return {
                value: inputValue,
                displayValue,
                selectedIndex,
                selectedValue,
                cols,
            }
        },
        /**
         * 触发 change 事件
         */
        onChange(index, value, method) {
            const inputValue = [...this.data.inputValue]
            inputValue[index] = value
            if (method) {
                this.triggerEvent(method, { ...this.getValue(inputValue), index })
            }
        },
        /**
         * 当滚动选择开始时的回调函数
         */
        onBeforeChange(e) {
            const { value } = e.detail
            const { index } = e.currentTarget.dataset
            this.onChange(index, value, 'beforeChange')
        },
        /**
         * 每列数据选择变化后的回调函数
         */
        onValueChange(e) {
            const { value } = e.detail
            const { index } = e.currentTarget.dataset
            this.onChange(index, value, 'valueChange')
        },
        /**
         * 滚动数据选择变化后的回调函数
         */
        onScrollChange(e) {
            const { value } = e.detail
            const { index } = e.currentTarget.dataset
            this.onChange(index, value, 'scrollChange')
        },
    },
    attached() {
        const { value, options } = this.data
        const fieldNames = this.getFieldNames()
        const cols = getRealCols(options, fieldNames)

        this.setData({ cols })
        this.setValue(value)
    },
})
