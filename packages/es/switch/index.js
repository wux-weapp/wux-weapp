import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import eventsMixin from '../helpers/mixins/eventsMixin'
import { isPresetColor } from '../helpers/colors'

baseComponent({
    useField: true,
    behaviors: [eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-switch',
        },
        value: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (this.hasFieldDecorator) return
                this.updated(newVal)
            },
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        color: {
            type: String,
            value: 'balanced',
            observer: 'updateStyle',
        },
        checkedText: {
            type: String,
            value: '',
        },
        uncheckedText: {
            type: String,
            value: '',
        },
    },
    data: {
        inputStyle: '',
        inputChecked: false,
    },
    computed: {
        classes: ['prefixCls, inputChecked, disabled, loading, color', function(prefixCls, inputChecked, disabled, loading, color) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${color}`]: color,
                [`${prefixCls}--checked`]: inputChecked,
                [`${prefixCls}--disabled`]: disabled || loading,
            })
            const input = classNames(`${prefixCls}__input`, {
                [`${prefixCls}__input--checked`]: inputChecked,
                [`${prefixCls}__input--disabled`]: disabled || loading,
            })
            const text = `${prefixCls}__text`
            const spin = `${prefixCls}__spin`

            return {
                wrap,
                input,
                text,
                spin,
            }
        }],
    },
    methods: {
        updated(inputChecked) {
            if (this.data.inputChecked !== inputChecked) {
                this.setData({ inputChecked })
            }
        },
        onTap(e) {
            const { inputChecked, disabled, loading } = this.data
            const newInputChecked = !inputChecked

            if (disabled || loading) return

            this.triggerEvent('change', { value: newInputChecked })
        },
        updateStyle(color) {
            const newColor = isPresetColor(color)
            const inputStyle = `border-color: ${newColor}; background-color: ${newColor};`

            this.setData({ inputStyle })
        },
    },
    attached() {
        this.updateStyle(this.data.color)
    },
})
