import classNames from './classNames'
import eventsMixin from './eventsMixin'

const DEFAULT_TRIGGER = 'onClick'
const CELL_NAME = '../cell/index'
const FIELD_NAME = '../field/index'

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
    onPickerChange() {},
}

export default function popupMixin(selector = '#wux-picker', platformProps = { pickerValueProp: 'value' }) {
    return Behavior({
        behaviors: [eventsMixin({ defaultEvents })],
        properties: {
            toolbar: {
                type: Object,
                value: defaultToolbar,
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
        },
        data: {
            mounted: false,
            popupVisible: false,
            inputValue: [],
        },
        methods: {
            /**
             * 设置组件显示或隐藏
             */
            setVisibleState(popupVisible, callback = () => {}) {
                if (this.data.popupVisible !== popupVisible) {
                    const params = {
                        mounted: true,
                        inputValue: this.data.value, // forceUpdate
                        popupVisible,
                    }
                    this.setData(popupVisible ? params : { popupVisible }, callback)
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
                    this.setScrollValue(undefined)
                    this.triggerEvent('visibleChange', { visible: popupVisible })
                }
            },
            /**
             * 打开
             */
            open() {
                this.fireVisibleChange(true)
            },
            /**
             * 关闭
             */
            close(callback) {
                if (typeof callback === 'function') {
                    callback.call(this, this.getPickerValue(this.scrollValue || this.data.inputValue))
                }
                this.fireVisibleChange(false)
            },
            /**
             * 组件关闭时重置其内部数据
             */
            onClosed() {
                this.picker = null
                this.setData({ mounted: false, inputValue: null })
            },
            /**
             * 点击确定按钮时的回调函数
             */
            onConfirm() {
                this.close((params) => {
                    this.triggerEvent('change', params) // collect field component
                    this.triggerEvent('confirm', params)
                })
            },
            /**
             * 点击取消按钮时的回调函数
             */
            onCancel(e) {
                this.close((params) => this.triggerEvent('cancel', params))
            },
            /**
             * 每列数据选择变化后的回调函数
             */
            onPickerChange(e) {
                if (!this.data.mounted) return
                const { value } = e.detail
                if (this.data.cascade) {
                    this.setCasecadeScrollValue(value)
                } else {
                    this.setScrollValue(value)
                }

                this.updated(value)
                this.triggerEvent('pickerChange', e.detail)
            },
            /**
             * 获取当前 picker 的值
             */
            getPickerValue(value = this.data.inputValue) {
                this.picker = this.picker || this.selectComponent(selector)
                return this.picker && this.picker.getValue(value)
            },
            /**
             * 更新子元素 props
             */
            updatedChildProps() {
                const elements = this.getRelationNodes(CELL_NAME)
                const { trigger = DEFAULT_TRIGGER } = this.data
                if (elements.length > 0) {
                    elements.forEach((inputElem) => {
                        const { inputEvents } = inputElem.data
                        const oriInputEvents = inputElem.data.oriInputEvents || { ...inputEvents }
                        inputEvents[trigger] = (...args) => {
                            if (oriInputEvents && oriInputEvents[trigger]) {
                                oriInputEvents[trigger](...args)
                            }
                            this.onTriggerClick()
                        }
                        inputElem.setData({ oriInputEvents, inputEvents })
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
             * 更新值
             */
            updated(inputValue) {
                if (this.hasFieldDecorator) return
                if (this.data.inputValue !== inputValue) {
                    this.setData({ inputValue })
                }
            },
            /**
             * 记录每列数据的变化值
             */
            setScrollValue(value) {
                this.scrollValue = value
            },
            /**
             * 记录每列数据的变化值 - 针对于级联
             */
            setCasecadeScrollValue(value) {
                if (value && this.scrollValue) {
                    const length = this.scrollValue.length
                    if (length === value.length && this.scrollValue[length - 1] === value[length - 1]) {
                        return
                    }
                }
                this.setScrollValue(value)
            },
            /**
             * 同步子元素的值
             */
            // setPickerProps(inputValue) {
            //     if (this.picker) {
            //         this.picker.setData({
            //             [platformProps.pickerValueProp]: inputValue,
            //         })
            //     }
            // },
        },
        lifetimes: {
            ready() {
                const { defaultVisible, visible, controlled } = this.data
                const popupVisible = controlled ? visible : defaultVisible

                this.mounted = true
                this.scrollValue = undefined
                this.setVisibleState(popupVisible)
                this.updatedChildProps()
            },
            detached() {
                this.mounted = false
            },
        },
        definitionFilter(defFields) {
            // set default child
            Object.assign(defFields.relations = (defFields.relations || {}), {
                [CELL_NAME]: {
                    type: 'child',
                    observer() {
                        this.updatedChildProps()
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
                        [`${prefixCls}__button--cancel`]: true
                    })
                    const confirm = classNames(`${prefixCls}__button`, {
                        [`${prefixCls}__button--confirm`]: true
                    })
                    const hover = `${prefixCls}__button--hover`
                    const title = `${prefixCls}__title`

                    return {
                        wrap,
                        toolbar,
                        inner,
                        cancel,
                        confirm,
                        hover,
                        title,
                    }
                }],
            })

            // set default observers
            Object.assign(defFields.observers = (defFields.observers || {}), {
                visible(popupVisible) {
                    if (this.data.controlled) {
                        this.setVisibleState(popupVisible)
                    }
                },
                value(inputValue) {
                    this.updated(inputValue)
                },
                // inputValue(inputValue) {
                //     this.setPickerProps(inputValue)
                // },
            })
        },
    })
}
