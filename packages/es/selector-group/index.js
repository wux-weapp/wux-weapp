import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import fieldNamesBehavior from '../helpers/mixins/fieldNamesBehavior'
import eventsMixin from '../helpers/mixins/eventsMixin'
import * as common from '../helpers/wxs/common'

/**
 * css var prefix
 */
const cssVarPattern = /^--/

function getCheckedValues(newVal, oldVal = []) {
    let checkedValues = [...oldVal]
    checkedValues = checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal]
    return checkedValues
}

const getOptions = (options, fieldNames) => common.getOptions(options, fieldNames)

baseComponent({
    useField: true,
    behaviors: [fieldNamesBehavior, eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-selector-group',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        shape: {
            type: String,
            value: 'default',
        },
        columns: {
            type: Number,
            value: 3,
        },
        gap: {
            type: Number,
            value: 8,
        },
        options: {
            type: Array,
            value: [],
        },
        defaultValue: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        multiple: {
            type: Boolean,
            value: false,
        },
        showCheckMark: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        extStyle: '',
        inputValue: [],
    },
    observers: {
        ['columns, gap'](columns, gap) {
            this.updateStyle(columns, gap)
        },
    },
    computed: {
        classes: ['prefixCls, theme, shape', function(prefixCls, theme, shape) {
            const finalShape = ['rounded', 'rectangular'].includes(shape) ? shape : ''
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            })
            const grid = `${prefixCls}__grid`
            const gridItem = classNames(`${prefixCls}__grid-item`, {
                [`${prefixCls}__grid-item--${shape}`]: finalShape,
            })
            const desc = `${prefixCls}__desc`
            const checkMark = `${prefixCls}__check-mark`
            const checkMarkIcon = `${prefixCls}__check-mark-icon`
            const selectable = `${prefixCls}__selectable`

            return {
                wrap,
                grid,
                gridItem,
                desc,
                checkMark,
                checkMarkIcon,
                selectable,
            }
        }],
    },
    methods: {
        updated(inputValue) {
            if (this.hasFieldDecorator) return
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        updateStyle(columns, gap) {
            const extStyle = styleToCssString({
                '--selector-group-columns': columns,
                '--selector-group-column-gap': `${gap * 2}rpx`,
            }, { exclude: cssVarPattern })

            if (extStyle !== this.data.extStyle) {
                this.setData({
                    extStyle,
                })
            }
        },
        onCheckboxChange(e) {
            const { value, checked } = e.detail
            const { inputValue, multiple } = this.data
            const checkedValues = multiple
                ? getCheckedValues(value, inputValue)
                : checked ? [value] : []

            if (!this.data.controlled) {
                this.updated(checkedValues)
            }

            this.triggerEvent('change', { ...this.getValue(checkedValues) })
        },
        getValue(value = this.data.inputValue, _cols = this.data.options) {
            const fieldNames = this.getFieldNames()
            const labelName = fieldNames.label
            const valueName = fieldNames.value
            const cols = getOptions(_cols, fieldNames)
            // Keep sort with value
            const checkedValues = value.reduce((acc, val) => (
                [
                    ...acc,
                    ...cols.filter((option) => option[valueName] === val),
                ]
            ), [])
            const displayValue = checkedValues.map((option) => option[labelName])
            const allValues = cols.map((option) => option[valueName])
            const selectedIndex = value.map((n) => allValues.indexOf(n))

            return {
                value,
                displayValue,
                selectedIndex,
                selectedValue: value,
                cols,
            }
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const inputValue = controlled ? value : defaultValue

        this.updated(inputValue)
    },
})
