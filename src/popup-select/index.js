import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import { notFoundContent, getNotFoundContent, getSelectIndex, getRealValue, flattenOptions } from './utils'

baseComponent({
    behaviors: [popupMixin('#wux-select')],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-select',
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
        ['options, multiple'](options, multiple) {
            const mergedOptions = flattenOptions(options)
            const inputValue = this.getRealValue(mergedOptions, this.data.inputValue, multiple)
            this.setData({
                inputValue,
                mergedOptions,
            })
        },
    },
    methods: {
        getRealValue(options = this.data.mergedOptions, value = this.data.inputValue, multiple = this.data.multiple) {
            return getRealValue(options, value, multiple)
        },
        updated(value, isForce) {
            if (!this.hasFieldDecorator || isForce) {
                const inputValue = this.getRealValue(this.data.mergedOptions, value)
                if (this.data.inputValue !== inputValue) {
                    this.setData({ inputValue })
                }
            }
        },
        setVisibleState(popupVisible, callback = () => {}) {
            if (this.data.popupVisible !== popupVisible) {
                const params = {
                    mounted: true,
                    inputValue: this.getRealValue(this.data.mergedOptions, this.data.value), // forceUpdate
                    popupVisible,
                }
                this.setData(popupVisible ? params : { popupVisible }, () => {
                    // collect field component & forceUpdate
                    if (popupVisible) {
                        let newValue = params.inputValue
                        let field = this.getFieldElem()
                        if (this.hasFieldDecorator && field) {
                            newValue = field.data.value
                            field.changeValue(newValue)
                        }

                        // scroll into view
                        this.getBoundingClientRect((height) => {
                            this.scrollIntoView(newValue, height)
                        })
                    }
                    callback()
                })
            }
        },
        onValueChange(e) {
            if (!this.data.mounted) return
            const { options, max, multiple } = this.data
            const { selectedValue: value } = e.detail
            if (multiple && max >= 1 && max < value.length) return

            this.setScrollValue(value)
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
            return this.selectComponent('#wux-select').getBoundingClientRect(callback)
        },
    },
    ready() {
        this.setData({
            mergedNotFoundContent: getNotFoundContent(this.data.notFoundContent),
        })
    },
})
