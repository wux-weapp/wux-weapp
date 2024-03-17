import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { isPresetColor } from '../helpers/colors'
import eventsMixin from '../helpers/mixins/eventsMixin'

baseComponent({
    useField: true,
    externalClasses: ['wux-input-class'],
    behaviors: [eventsMixin()],
    relations: {
        '../field/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-selectable',
        },
        type: {
            type: String,
            value: 'checkbox',
        },
        value: {
            type: String,
            value: '',
        },
        defaultChecked: {
            type: Boolean,
            value: false,
        },
        checked: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
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
            observer(newVal) {
                this.setData({
                    inputColor: isPresetColor(newVal),
                })
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        iconSize: {
            type: String,
            value: '',
        },
        iconOn: {
            type: String,
            value: '',
        },
        iconOff: {
            type: String,
            value: '',
        },
    },
    data: {
        inputChecked: false,
        inputColor: '',
        extStyle: '',
        innerIconSize: '23',
        innerIconOn: 'success',
        innerIconOff: 'circle',
    },
    observers: {
        ['type, iconSize, iconOn, iconOff'](type, iconSize, iconOn, iconOff) {
            const useDefaultSize = iconSize === ''
            const useDefaultIcon = iconOn === '' && iconOff === ''
            if (type === 'checkbox') {
                this.setData({
                    innerIconSize: useDefaultSize ? 23 : parseInt(iconSize),
                    innerIconOn: useDefaultIcon ? 'success' : iconOn,
                    innerIconOff: useDefaultIcon ? 'circle' : iconOff,
                })
            } else if (type === 'radio') {
                this.setData({
                    innerIconSize: useDefaultSize ? 16 : parseInt(iconSize),
                    innerIconOn: useDefaultIcon ? 'success_no_circle' : iconOn,
                    innerIconOff: useDefaultIcon ? '' : iconOff,
                })
            }
        },
    },
    computed: {
        classes: ['prefixCls, inputChecked, disabled, readOnly', function(prefixCls, inputChecked, disabled, readOnly) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--checked`]: inputChecked,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--readonly`]: readOnly,
            })
            const input = `${prefixCls}__input`
            const icon = `${prefixCls}__icon`

            return {
                wrap,
                input,
                icon,
            }
        }],
    },
    methods: {
        updated(inputChecked) {
            if (this.hasFieldDecorator) return
            if (this.data.inputChecked !== inputChecked) {
                this.setData({
                    inputChecked,
                })
            }
        },
        onChange() {
            const { value, inputChecked, disabled, readOnly, controlled } = this.data
            const item = {
                checked: !inputChecked,
                value,
                type: 'checkbox',
            }

            if (disabled || readOnly) return

            if (!controlled) {
                this.updated(!inputChecked)
            }

            this.triggerEvent('change', item)
        },
    },
    attached() {
        const { defaultChecked, checked, controlled } = this.data
        const inputChecked = controlled ? checked : defaultChecked
        const inputColor = isPresetColor(this.data.color)

        this.setData({
            inputChecked,
            inputColor,
        })
    },
})
