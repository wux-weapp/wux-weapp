import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { getDefaultContext } from '../helpers/getDefaultContext'
import { props as checkboxGroupProps } from '../checkbox-group/props'

const defaultContext = getDefaultContext(checkboxGroupProps, [
    'disabled',
    'readOnly',
])

baseComponent({
    relations: {
        '../checkbox-group/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-checkbox',
        },
        cellPrefixCls: {
            type: String,
            value: 'wux-cell',
        },
        selectablePrefixCls: {
            type: String,
            value: 'wux-selectable',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        value: {
            type: String,
            value: '',
        },
        checked: {
            type: Boolean,
            value: false,
            observer(newVal) {
                this.setData({
                    inputChecked: newVal,
                })
            },
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        readOnly: {
            type: Boolean,
            value: false,
        },
        color: {
            type: String,
            value: 'balanced',
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
        },
    },
    data: {
        inputChecked: false,
        index: 0,
        isLast: false,
        context: defaultContext,
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const cell = classNames(prefixCls)
            const selectable = `${prefixCls}__selectable`

            return {
                cell,
                selectable,
            }
        }],
    },
    methods: {
        checkboxChange(e) {
            const { value, index, disabled, readOnly, context } = this.data
            const parent = this.getRelationNodes('../checkbox-group/index')[0]
            const item = {
                checked: e.detail.checked,
                value,
                index,
            }

            if (disabled || context.disabled || readOnly || context.readOnly) return

            parent ? parent.onChange(item) : this.triggerEvent('change', item)
        },
        changeValue(inputChecked = false, index = 0, isLast = false, context = defaultContext) {
            this.setData({
                inputChecked,
                index,
                isLast,
                context,
            })
        },
    },
})
