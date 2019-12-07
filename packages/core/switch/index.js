import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import eventsMixin from '../helpers/eventsMixin'
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
        color: {
            type: String,
            value: 'balanced',
            observer: 'updateStyle',
        },
    },
    data: {
        inputStyle: '',
        inputChecked: false,
    },
    computed: {
        classes: ['prefixCls, inputChecked, disabled', function(prefixCls, inputChecked, disabled) {
            const wrap = classNames(prefixCls)
            const input = classNames(`${prefixCls}__input`, {
                [`${prefixCls}__input--checked`]: inputChecked,
                [`${prefixCls}__input--disabled`]: disabled,
            })

            return {
                wrap,
                input,
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
            const { inputChecked, disabled } = this.data
            const newInputChecked = !inputChecked

            if (disabled) return

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
