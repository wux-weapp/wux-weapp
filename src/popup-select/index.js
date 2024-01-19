import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import nextTick from '../helpers/nextTick'
import { POPUP_SELECTOR, notFoundContent, getNotFoundContent, flattenOptions } from './utils'

baseComponent({
    behaviors: [popupMixin(POPUP_SELECTOR)],
    properties: {
        prefixCls: {
            type: String,
            value: POPUP_SELECTOR.substring(1),
        },
        value: {
            type: [String, Array],
            value: '',
        },
        options: {
            type: Array,
            value: [],
        },
        multiple: {
            type: Boolean,
            value: false,
        },
        max: {
            type: Number,
            value: -1,
        },
        virtualized: {
            type: Boolean,
            value: false,
        },
        notFoundContent: {
            type: null,
            value: { ...notFoundContent },
        },
    },
    data: {
        mergedOptions: [],
        mergedOptionsValueMap: new Map(),
        mergedNotFoundContent: { ...notFoundContent },
    },
    observers: {
        ['options, multiple'](options, multiple) {
            const mergedOptions = flattenOptions(options)
            
            const mergedOptionsValueMap = new Map()
            mergedOptions.forEach((option, index) => {
                mergedOptionsValueMap.set(option.value, { option, index })
            })

            this.setData({
                mergedOptions,
                mergedOptionsValueMap,
            })
        },
        notFoundContent(notFoundContent) {
            this.renderEmpty(notFoundContent)
        },
    },
    methods: {
        renderEmpty(notFoundContent) {
            const mergedNotFoundContent = getNotFoundContent(notFoundContent)
            if (this.data.mergedNotFoundContent !== mergedNotFoundContent) {
                this.setData({ mergedNotFoundContent })
            }
        },
        updated(inputValue, isForce) {
            if (this.hasFieldDecorator && !isForce) { return }
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        getIndexRef(props = this.data) {
            if (props.multiple) {
                const len = props.value.length
                if (
                    props.value.length > 0 &&
                    props.mergedOptionsValueMap.has(props.value[len - 1])
                ) {
                    const { index } = props.mergedOptionsValueMap.get(
                        props.value[len - 1]
                    )
                    return index
                }
            } else {
                if (
                    props.value &&
                    props.mergedOptionsValueMap.has(props.value)
                ) {
                    const { index } = props.mergedOptionsValueMap.get(props.value)
                    return index
                }
            }
            return -1
        },
        scrollToItem(index) {
            const menuRef = this.selectComponent(POPUP_SELECTOR)
            if (menuRef) {
                menuRef.scrollToItem(index)
            }
        },
        onShow() {
            const { value } = this.data
            let newValue = this.data.inputValue

            if (newValue !== value) {
                newValue = value
            }

            // collect field component & forceUpdate
            if (this.hasFieldDecorator) {
                const field = this.getFieldElem()
                if (field) {
                    newValue = field.data.value
                    field.changeValue(newValue)
                }
            }

            if (this.data.inputValue !== newValue) {
                this.updated(newValue)
            }

            nextTick(() => {
                const index = this.getIndexRef({ ...this.data, value: newValue  })
                if (index !== -1) {
                    this.scrollToItem(index)
                }
            })
        },
        getPickerValue(value = this.data.inputValue) {
            const { virtualized, mergedOptions } = this.data
            const cols = virtualized ? mergedOptions : undefined
            this.picker = this.picker || this.selectComponent(POPUP_SELECTOR)
            return this.picker && this.picker.getValue(value, cols)
        },
        onSelectChange(e) {
            if (!this.mounted) { return }
            const { value } = e.detail
            this.updated(value, true)
            this.triggerEvent('valueChange', this.formatPickerValue({ ...e.detail }))
        },
    },
    ready() {
        this.renderEmpty(this.data.notFoundContent)
    },
})
