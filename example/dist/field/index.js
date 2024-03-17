import baseComponent from '../helpers/baseComponent'
import fieldBehavior from '../helpers/mixins/fieldBehavior'
import classNames from '../helpers/libs/classNames'
import warning from '../helpers/libs/warning'
import { nextTick } from '../helpers/hooks/useNativeAPI'
import { getDefaultContext } from '../helpers/shared/getDefaultContext'
import { useRect } from '../helpers/hooks/useDOM'
import { props as formProps } from '../form/props'
import { props } from './props'

const defaultContext = getDefaultContext(formProps, [
    'layout',
    'validateMessages',
    'requiredMarkStyle',
    'asteriskText',
    'requiredText',
    'optionalText',
    'disabled',
    'readOnly',
])

const children = [
    'picker',
    'date-picker',
    'popup-select',
    'radio-group',
    'checkbox-group',
    'selectable',
    'selector-group',
    'switch',
    'input',
    'input-number',
    'rater',
    'slider',
    'textarea',
]

const relations = children.map((name) => `../${name}/index`).reduce((acc, name) => {
    return {
        ...acc,
        [name]: {
            type: 'descendant',
            observer: function() {
                this.callDebounceFn(this.changeValue)
            },
        },
    }
}, {})

baseComponent({
    useField: true,
    useExport: true,
    behaviors: [fieldBehavior],
    relations: {
        '../form/index': {
            type: 'ancestor',
        },
        ...relations,
    },
    properties: props,
    data: {
        index: 0,
        isLast: false,
        context: defaultContext,
        popoverVisible: false,
        slotRect: null,
        relativeRect: null,
    },
    observers: {
        initialValue(initialValue) {
            this.changeValue(initialValue)
        },
        ['valuePropName, valueNameFromEvent, trigger, validate, validateTrigger, preserve, rules, validateFirst, hidden']() {
            this.changeValue()
        },
    },
    computed: {
        classes: ['prefixCls, childElementPosition, labelWrap', function(prefixCls, childElementPosition, labelWrap) {
            const wrap = classNames(prefixCls)
            const child = classNames(`${prefixCls}__child`, {
                [`${prefixCls}__child--position-${childElementPosition}`]: childElementPosition,
            })
            const label = classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap,
            })
            const extra = `${prefixCls}__extra`
            const arrow = `${prefixCls}__arrow`
            const asterisk = `${prefixCls}__required-asterisk`
            const text = `${prefixCls}__required-text`
            const feedback = `${prefixCls}__feedback-message`
            const labelHelp = `${prefixCls}__label-help`

            return {
                wrap,
                child,
                label,
                extra,
                arrow,
                asterisk,
                text,
                feedback,
                labelHelp,
            }
        }],
    },
    methods: {
        /**
         * 获取父节点
         */
        getFormContext() {
            return this.getRelationsByName('../form/index')[0]
        },
        /**
         * 获取子节点
         */
        getChildNodes() {
            return this.getRelationsByType('descendant')
        },
        changeContext(index = 0, isLast = false, context = defaultContext) {
            this.setData({
                index,
                isLast,
                context,
            })
        },
        setPopoverVisible() {
            const popoverVisible = !this.data.popoverVisible
            const promise = popoverVisible ? this.getPopoverRects() : Promise.resolve([])
            promise.then(([slotRect, relativeRect]) => {
                if (slotRect && relativeRect) {
                    this.setData({
                        slotRect,
                        relativeRect,
                        popoverVisible,
                    })
                } else {
                    this.setData({
                        popoverVisible,
                    })
                }
            })
        },
        getPopoverRects() {
            const { prefixCls } = this.data
            const getSlotRect = () => useRect(`.${prefixCls}__label-help`, this)
            const getRelativeRect = () => new Promise((resolve) => {
                const wuxCell = this.querySelector('#wux-cell')
                if (wuxCell) {
                    wuxCell.getBoundingClientRect((_height, rect) => {
                        resolve(rect)
                    })
                }
            })
            return Promise.all([getSlotRect(), getRelativeRect()])
        },
        /**
         * 更新 value 值，同步到子元素
         */
        changeValue(value = this.data.value) {
            // set value
            if (this.data.value !== value) {
                this.setData({ value })
            }

            const elements = this.getChildNodes()
            const registerInputElem = (valuePropName, value, inputElem) => {
                const nextProps = {
                    hasFieldDecorator: true,
                }

                if (inputElem.data[valuePropName] !== value) {
                    nextProps[valuePropName] = value
                }

                inputElem.setData({
                    ...nextProps,
                })
    
                nextTick(() => {
                    this.forceUpdate(inputElem)
                })
            }

            if (elements.length > 0) {
                elements.forEach((inputElem) => {
                    Object.defineProperty(inputElem, 'hasFieldDecorator', {
                        value: true,
                        enumerable: false,
                        writable: true,
                        configurable: true,
                    })
                    registerInputElem(this.data.valuePropName, value, inputElem)
                })
            }
        },
        /**
         * 强制更新元素
         */
        forceUpdate(inputElem, callback) {
            const formContext = this.getFormContext()
            if (!formContext) {
                warning(
                    false,
                    `Field<${this.data.name}> instance is not connected to any Form element.Forgot to use <wux-form />?`
                )
                return
            }

            const { getFieldDecorator } = formContext.getInternalHooks('FORM_HOOK_MARK')
            const fieldData = this.data
            const { name } = fieldData
            const inputProps = getFieldDecorator(name, fieldData, this)(inputElem)
            const finallyCb = () => {
                if (callback) {
                    callback()
                }
                // field reRender
                this.reRender(this.data)
            }
            
            inputElem.setData(inputProps, finallyCb)
        },
        expose() {
            return {
                changeContext: this.changeContext.bind(this),
                changeValue: this.changeValue.bind(this),
                forceUpdate: this.forceUpdate.bind(this),
            }
        },
    },
    ready() {
        const formContext = this.getFormContext()
        if (formContext) {
            const { registerField } = formContext.getInternalHooks('FORM_HOOK_MARK')
            const { name } = this.data
            this.cancelRegister = registerField(name, this)
        }
    },
    detached() {
        if (this.cancelRegister) {
            this.cancelRegister()
            this.cancelRegister = null
        }
    },
})
