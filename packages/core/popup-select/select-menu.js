import baseComponent from '../helpers/baseComponent'
import { POPUP_SELECTOR, getDefaultProps } from './utils'

baseComponent({
    useExport: true,
    properties: {
        height: {
            type: Number,
            value: 270,
        },
        ...getDefaultProps(),
    },
    data: {
        scrollTop: 0,
    },
    methods: {
        onValueChange(e) {
            const { max, multiple } = this.data
            const { selectedValue: value } = e.detail
            if (multiple && max >= 1 && max < value.length) { return }

            this.triggerEvent('selectChange', this.getValue(value))
        },
        getValue(value = this.data.value, cols = this.data.options) {
            this.picker = this.picker || this.querySelector(POPUP_SELECTOR)
            return this.picker && this.picker.getValue(value, cols)
        },
        expose() {
            const scrollToItem = (index) => {
                const scrollIntoView = (index, height) => {
                    const { options } = this.data
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
                }
                const getBoundingClientRect = (cb) => {
                    const ref = this.querySelector(POPUP_SELECTOR)
                    return ref && ref.getBoundingClientRect && ref.getBoundingClientRect(cb)
                }
                getBoundingClientRect((height) => {
                    scrollIntoView(index, height)
                })
            }

            return {
                scrollToItem,
                getValue: this.getValue.bind(this),
            }
        },
    },
})
