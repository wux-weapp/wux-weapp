import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'

baseComponent({
    options: {
        multipleSlots: false,
    },
    relations: {
        '../cell/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.updateIsLastElement)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-cell-group',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        mode: {
            type: String,
            value: 'default',
        },
        bodyStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    internalBodyStyle: styleToCssString(newVal),
                })
            },
        },
    },
    data: {
        internalBodyStyle: '',
    },
    computed: {
        classes: ['prefixCls, mode', function(prefixCls, mode) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--card`]: mode === 'card',
            })
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`
            const ft = `${prefixCls}__ft`

            return {
                wrap,
                hd,
                bd,
                ft,
            }
        }],
    },
    methods: {
        updateIsLastElement() {
            const elements = this.getRelationNodes('../cell/index')
            if (elements.length > 0) {
                const lastIndex = elements.length - 1
                elements.forEach((element, index) => {
                    element.updateIsLastElement(index === lastIndex)
                })
            }
        },
        getBoundingClientRect(callback) {
            const className = `.${this.data.prefixCls}`
            wx
                .createSelectorQuery()
                .in(this)
                .select(className)
                .boundingClientRect((rect) => {
                    if (!rect) return
                    callback.call(this, rect.height)
                })
                .exec()
        },
    },
})
