import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { getDefaultContext } from '../helpers/shared/getDefaultContext'
import { props as radioGroupProps } from '../radio-group/props'

const defaultContext = {
    ...getDefaultContext(radioGroupProps, [
        'disabled',
        'readOnly',
        'hasLine',
        
        // only context
        'hasFieldDecorator',
        'withListComponent',
        'iconPosition',
        'iconSize',
        'iconOn',
        'iconOff',
    ]),
    withListComponent: false,
}

baseComponent({
    relations: {
        '../radio-group/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-radio',
        },
        cellPrefixCls: {
            type: String,
            value: 'wux-cell',
        },
        selectablePrefixCls: {
            type: String,
            value: 'wux-selectable',
        },
        thumb: {
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
        hasLine: {
            type: Boolean,
            value: true,
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
            const thumb = `${prefixCls}__thumb`
            const iconPosition = `${prefixCls}__icon-position`
            const iconSelectable = `${prefixCls}__icon-selectable`
            const selectable = `${prefixCls}__selectable`
            const selectableH = `${prefixCls}__selectable-horizontal`

            return {
                cell,
                thumb,
                iconPosition,
                iconSelectable,
                selectable,
                selectableH,
            }
        }],
    },
    methods: {
        radioChange(e) {
            const { disabled, readOnly, context } = this.data
            const { checked } = e.detail

            if (disabled || context.disabled || readOnly || context.readOnly) return

            this.onChange(checked)
        },
        changeValue(inputChecked = false, index = 0, isLast = false, context = defaultContext) {
            this.setData({
                inputChecked,
                index,
                isLast,
                context,
            })
        },
        onChange(inputChecked) {
            const { value, index } = this.data
            const item = {
                checked: inputChecked,
                value,
                index,
            }
            const parent = this.getRelationsByName('../radio-group/index')[0]
            parent ? parent.onChange(item) : this.triggerEvent('change', item)
        },
        setChecked(inputChecked) {
            if (this.data.inputChecked !== inputChecked) {
                this.setData({
                    inputChecked,
                })
            }
            this.onChange(inputChecked)
        },
        check(){
            this.setChecked(true)
        },
        uncheck(){
            this.setChecked(false)
        },
        toggle(){
            this.setChecked(!this.data.inputChecked)
        },  
    },
})
