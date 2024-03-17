import classNames from '../libs/classNames'
import eventsMixin from './eventsMixin'
import fieldNamesBehavior from './fieldNamesBehavior'

const DEFAULT_TRIGGER = 'onClick'
const CELL_NAME = '../cell/index'
const FIELD_NAME = '../field/index'
const TOUCH_VIEW_NAME = '../touch-view/index'

const defaultToolbar = {
    title: '请选择',
    cancelText: '取消',
    confirmText: '确定',
}

const defaultEvents = {
    onChange() {},
    onConfirm() {},
    onCancel() {},
    onVisibleChange() {},
    onValueChange() {},
}

const defaultPlatformProps = {
    labelPropName: 'label',
    format(values, props) {
        return Array.isArray(values.displayValue) ? values.displayValue.join(',') : values.displayValue
    },
}

export default function popupMixin(selector = '#wux-picker', platformProps = defaultPlatformProps) {
    return Behavior({
        behaviors: [fieldNamesBehavior, eventsMixin({ defaultEvents })],
        properties: {
            toolbar: {
                type: Object,
                value: { ...defaultToolbar },
            },
            trigger: {
                type: String,
                value: DEFAULT_TRIGGER,
            },
            defaultVisible: {
                type: Boolean,
                value: false,
            },
            visible: {
                type: Boolean,
                value: false,
            },
            controlled: {
                type: Boolean,
                value: false,
            },
            disabled: {
                type: Boolean,
                value: false,
            },
        },
        data: {
            popupVisible: false,
            inputValue: [],
        },
        methods: {
            /**
             * 设置组件显示或隐藏
             */
            setVisibleState(popupVisible) {
                if (this.data.popupVisible !== popupVisible) {
                    this.setData({ popupVisible })
                }
            },
            /**
             * 触发 visibleChange 事件
             */
            fireVisibleChange(popupVisible) {
                if (this.data.popupVisible !== popupVisible) {
                    if (!this.data.controlled) {
                        this.setVisibleState(popupVisible)
                    }
                    this.triggerEvent('visibleChange', { visible: popupVisible })
                }
            },
            /**
             * 打开
             */
            open() {
                this.fireVisibleChange(true)
            },
            onShow() {
                let value = this.data.value
                let newValue = this.data.inputValue
    
                if (newValue !== value) {
                    newValue = value
                }
    
                // collect field component & forceUpdate
                if (this.hasFieldDecorator) {
                    const fieldContext = this.getFieldContext()
                    if (fieldContext) {
                        newValue = fieldContext.data.value
                        fieldContext.changeValue(newValue)
                    }
                }
    
                if (this.data.inputValue !== newValue) {
                    this.updated(newValue)
                }
            },
            /**
             * 关闭
             */
            close(callback) {
                if (typeof callback === 'function') {
                    const values = this.getPickerValue(this.data.inputValue)
                    callback.call(this, this.formatPickerValue(values))
                }
                this.fireVisibleChange(false)
            },
            /**
             * 组件关闭时重置其内部数据
             */
            onClosed() {
                let value = this.data.value
    
                // collect field component & forceUpdate
                if (this.hasFieldDecorator) {
                    const fieldContext = this.getFieldContext()
                    if (fieldContext) {
                        value = fieldContext.data.value
                    }
                }
    
                this.picker = null
                this.setData({ inputValue: value })
            },
            /**
             * 点击确定按钮时的回调函数
             */
            onConfirm() {
                this.close((values) => {
                    this.triggerEvent('change', values) // collect field component
                    this.triggerEvent('confirm', values)
                })
            },
            /**
             * 点击取消按钮时的回调函数
             */
            onCancel() {
                this.close((values) => this.triggerEvent('cancel', values))
            },
            /**
             * 每列数据选择变化后的回调函数
             */
            onValueChange(e) {
                if (!this.mounted) { return }
                const { value } = e.detail
                this.updated(value, true)
                this.triggerEvent('valueChange', this.formatPickerValue(e.detail))
            },
            /**
             * 获取当前 picker 的值
             */
            getPickerValue(value = this.data.inputValue) {
                this.picker = this.picker || this.querySelector(selector)
                return this.picker && this.picker.getValue(value)
            },
            /**
             * 格式化 picker 返回值
             */
            formatPickerValue(values) {
                return {
                    ...values,
                    [platformProps.labelPropName]: platformProps.format(values, this.data),
                }
            },
            /**
             * 获取 field 父元素
             */
            getFieldContext() {
                return this.getRelationsByName(FIELD_NAME)[0]
            },
            /**
             * 设置子元素 props
             */
            setChildProps(relationKey = CELL_NAME) {
                if (this.data.disabled) return
                const elements = this.getRelationsByName(relationKey)
                const { trigger = DEFAULT_TRIGGER } = this.data
                if (elements.length > 0) {
                    elements.forEach((inputElem) => {
                        const originalProps = inputElem.data
                        const { inputEvents } = originalProps
                        const inputProps = {
                            oriInputEvents: { ...inputEvents },
                            inputEvents: {},
                        }
                        
                        if (originalProps.oriInputEvents) {
                            delete inputProps.oriInputEvents
                        }

                        inputProps.inputEvents[trigger] = (...args) => {
                            if (originalProps.oriInputEvents && originalProps.oriInputEvents[trigger]) {
                                originalProps.oriInputEvents[trigger](...args)
                            } else if (inputEvents && inputEvents[trigger]) {
                                inputEvents[trigger](...args)
                            }
                            this.onTriggerClick()
                        }
    
                        inputElem.setData(inputProps)
                    })
                }
            },
            /**
             * 触发事件
             */
            onTriggerClick() {
                this.fireVisibleChange(!this.data.popupVisible)
            },
            /**
             * 阻止移动触摸
             */
            noop() {},
            /**
             * 更新值
             */
            updated(inputValue, isForce) {
                if (this.hasFieldDecorator && !isForce) { return }
                if (this.data.inputValue !== inputValue) {
                    this.setData({ inputValue })
                }
            },
        },
        lifetimes: {
            ready() {
                const { defaultVisible, visible, controlled, value } = this.data
                const popupVisible = controlled ? visible : defaultVisible

                this.mounted = true
                this.setVisibleState(popupVisible)
                this.updated(value)
            },
            detached() {
                this.mounted = false
            },
        },
        definitionFilter(defFields) {
            // set default child
            Object.assign(defFields.relations = (defFields.relations || {}), {
                [TOUCH_VIEW_NAME]: {
                    type: 'child',
                    observer() {
                        this.setChildProps(TOUCH_VIEW_NAME)
                    },
                },
                [CELL_NAME]: {
                    type: 'child',
                    observer() {
                        this.setChildProps()
                    },
                },
                [FIELD_NAME]: {
                    type: 'ancestor',
                },
            })

            // set default classes
            Object.assign(defFields.computed = (defFields.computed || {}), {
                classes: ['prefixCls', function(prefixCls) {
                    const wrap = classNames(prefixCls)
                    const toolbar = `${prefixCls}__toolbar`
                    const inner = `${prefixCls}__inner`
                    const cancel = classNames(`${prefixCls}__button`, {
                        [`${prefixCls}__button--cancel`]: true,
                    })
                    const confirm = classNames(`${prefixCls}__button`, {
                        [`${prefixCls}__button--confirm`]: true,
                    })
                    const hover = `${prefixCls}__button--hover`
                    const disabled = `${prefixCls}__button--disabled`
                    const title = `${prefixCls}__title`

                    return {
                        wrap,
                        toolbar,
                        inner,
                        cancel,
                        confirm,
                        hover,
                        disabled,
                        title,
                    }
                }],
            })

            // set default observers
            Object.assign(defFields.observers = (defFields.observers || {}), {
                visible(popupVisible) {
                    if (!this.mounted) { return }
                    if (this.data.controlled) {
                        this.setVisibleState(popupVisible)
                    }
                },
                value(value) {
                    if (!this.mounted) { return }
                    this.updated(value)
                },
            })
        },
    })
}
