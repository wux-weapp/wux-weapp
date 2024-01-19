import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import { notFoundContent, getNotFoundContent, getSelectIndex, getRealValue, flattenOptions } from './utils'

const POPUP_SELECTOR = '#wux-select'

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
            value: notFoundContent,
            observer(newVal) {
                this.setData({
                    mergedNotFoundContent: getNotFoundContent(newVal),
                })
            },
        },
    },
    data: {
        scrollTop: 0,
        mergedOptions: [],
        mergedNotFoundContent: null,
    },
    observers: {
        ['options, multiple, virtualized'](options, multiple, virtualized) {
            const mergedOptions = flattenOptions(options)
            const inputValue = this.getRealValue(mergedOptions, this.data.inputValue, multiple)
            this.setData({
                inputValue,
                mergedOptions,
            })
            this.initVirtual(virtualized, mergedOptions)
        },
    },
    methods: {
        getRealValue(options = this.data.mergedOptions, value = this.data.inputValue, multiple = this.data.multiple) {
            return getRealValue(options, value, multiple)
        },
        updated(value, isForce) {
            if (this.hasFieldDecorator && !isForce) { return }
            const inputValue = this.getRealValue(this.data.mergedOptions, value)
            if (this.data.inputValue !== inputValue) {
                this.setData({ inputValue })
            }
        },
        onShowed() {
            const { value, virtualized, mergedOptions } = this.data
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

            if (!virtualized) {
                // scroll into view
                this.getBoundingClientRect((height) => {
                    this.scrollIntoView(newValue, height)
                })
            }

            if (this.data.inputValue !== newValue) {
                this.updated(newValue)
            }

            this.initVirtual(virtualized, mergedOptions)
        },
        getPickerValue(value = this.data.inputValue) {
            const { virtualized, mergedOptions } = this.data
            const cols = virtualized ? mergedOptions : undefined
            this.picker = this.picker || this.selectComponent(POPUP_SELECTOR)
            return this.picker && this.picker.getValue(value, cols)
        },
        onValueChange(e) {
            if (!this.mounted) { return }
            const { max, multiple } = this.data
            const { selectedValue: value } = e.detail
            if (multiple && max >= 1 && max < value.length) return

            this.updated(value, true)
            this.triggerEvent('valueChange', this.formatPickerValue({ ...e.detail, value }))
        },
        scrollIntoView(value, height) {
            const { options, multiple } = this.data
            const index = getSelectIndex(options, value, multiple)
            const nums = options.length

            // scroll into view
            let activeIndex = Array.isArray(index) ? index[index.length - 1] : index
            if (activeIndex === -1 || activeIndex === undefined) {
                activeIndex = 0
            }

            // set scrollTop
            const scrollTop = nums >= 1 ? parseFloat(height / nums * activeIndex) : 0

            if (this.data.scrollTop !== scrollTop) {
                this.setData({ scrollTop })
            }
        },
        getBoundingClientRect(callback) {
            return this.selectComponent(POPUP_SELECTOR).getBoundingClientRect(callback)
        },
        onVirtualChange(e) {
            const { startIndex, endIndex } = e.detail
            if (
                this.data.startIndex !== startIndex ||
                this.data.endIndex !== endIndex
            ) {
                this.setData(e.detail)
            }
        },
        initVirtual(virtualized, items) {
            if (virtualized) {
                const startTime = Date.now()
                const virtualListRef = this.selectComponent('#wux-virtual-list')
                if (virtualListRef) {
                    virtualListRef.render(items, () => {
                        const diffTime = Date.now() - startTime
                        console.log(`onSuccess - render time: ${diffTime}ms`)
                    })
                }
            }
        },
    },
    ready() {
        this.setData({
            mergedNotFoundContent: getNotFoundContent(this.data.notFoundContent),
        })
    },
})
