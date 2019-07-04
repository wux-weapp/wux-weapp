import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'
import { getSelectIndex, getRealValue } from './utils'

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
    },
    data: {
        scrollTop: 0,
    },
    observers: {
        ['options, multiple'](options, multiple) {
            this.setData({
                inputValue: this.getRealValue(options, this.data.inputValue, multiple),
            })
        },
    },
    methods: {
        getRealValue(options = this.data.options, value = this.data.inputValue, multiple = this.data.multiple) {
            return getRealValue(options, value, multiple)
        },
        updated(value, isForce) {
            if (!this.hasFieldDecorator || isForce) {
                const inputValue = this.getRealValue(this.data.options, value)
                if (this.data.inputValue !== inputValue) {
                    this.setData({ inputValue })
                }
            }
        },
        setVisibleState(popupVisible, callback = () => {}) {
            if (this.data.popupVisible !== popupVisible) {
                const params = {
                    mounted: true,
                    inputValue: this.getRealValue(this.data.options, this.data.value), // forceUpdate
                    popupVisible,
                }
                this.setData(popupVisible ? params : { popupVisible }, () => {
                    if (popupVisible) {
                        this.getBoundingClientRect((height) => {
                            this.scrollIntoView(params.inputValue, height)
                        })
                    }
                    callback()
                })
            }
        },
        onValueChange(e) {
            if (!this.data.mounted) return
            const { options, max, multiple } = this.data
            const oldValue = this.data.inputValue
            const { value: newValue } = e.detail
            const value = !multiple ? newValue : oldValue.indexOf(newValue) !== -1 ? oldValue.filter((n) => n !== newValue) : [...oldValue, newValue]
            if (multiple && max >= 1 && max < value.length) return

            this.setScrollValue(value)
            this.updated(value, true)
            this.triggerEvent('valueChange', { ...e.detail, value })
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
})
