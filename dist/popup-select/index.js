import baseComponent from '../helpers/baseComponent'
import popupMixin from '../helpers/popupMixin'

function convertValue(value) {
    return Array.isArray(value) ? [...value] : typeof value === 'string' ? [value] : []
}

function getSelectIndex({ value = '', options = [], multiple = false }) {
    const newValue = convertValue(value)
    const values = options.map((n) => n.value || n).filter((n) => !!n)
    if (!multiple) return values.indexOf(newValue[0])
    return newValue.map((n) => values.indexOf(n))
}

baseComponent({
    behaviors: [popupMixin('#wux-select')],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-select',
        },
        value: {
            type: null,
            value: null,
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
        ['options, multiple'](options) {
            this.setData({
                inputValue: this.getRealValue(options),
            })
        },
    },
    methods: {
        getRealValue(options = this.data.options, value = this.data.inputValue) {
            const newValue = convertValue(value)
            const values = options.map((n) => n.value || n).filter((n) => !!n)

            if (!this.data.multiple) {
                if (values.includes(newValue[0])) {
                    return newValue[0]
                }
                return ''
            }

            return newValue.filter((n) => values.includes(n))
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
        onPickerChange(e) {
            if (!this.data.mounted) return
            const { options, max, multiple } = this.data
            if (multiple && max >= 1 && max < value.length) return
            const oldValue = this.data.inputValue
            const { value: newValue } = e.detail
            const value = !multiple ? newValue : oldValue.indexOf(newValue) !== -1 ? oldValue.filter((n) => n !== newValue) : [...oldValue, newValue]

            this.setScrollValue(value)
            this.updated(value)
            this.triggerEvent('pickerChange', e.detail)
        },
        scrollIntoView(value, height) {
            const index = getSelectIndex(this.data)
            const nums = this.data.options.length

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
