import baseComponent from '../helpers/baseComponent'
import { nextTick } from '../helpers/hooks/useNativeAPI'
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
        startIndex: 0, // 第一个元素的索引值
        endIndex: -1, // 最后一个元素的索引值
    },
    observers: {
        options(options) {
            nextTick(() => this.renderVirtualList(options))
        },
    },
    methods: {
        onVirtualChange(e) {
            const { startIndex, endIndex } = e.detail
            if (
                this.data.startIndex !== startIndex ||
                this.data.endIndex !== endIndex
            ) {
                this.setData(e.detail)
                this.triggerEvent('virtualChange', { ...e.detail })
            }
        },
        renderVirtualList(options) {
            const virtualListRef = this.querySelector('#wux-virtual-list')
            if (virtualListRef) {
                virtualListRef.render(options)
            }
        },
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
                const list = this.querySelector('#wux-virtual-list')
                if (list) {
                    return list.scrollToIndex(index)
                }
            }

            return {
                scrollToItem,
                getValue: this.getValue.bind(this),
            }
        },
    },
    ready() {
        const { options } = this.data
        nextTick(() => this.renderVirtualList(options))
    },
})
