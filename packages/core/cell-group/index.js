import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { useRect } from '../helpers/hooks/useDOM'

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
        hasLine: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        internalBodyStyle: '',
    },
    computed: {
        classes: ['prefixCls, mode, hasLine', function(prefixCls, mode, hasLine) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--card`]: mode === 'card',
                [`${prefixCls}--has-line`]: hasLine,
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
            const elements = this.getRelationsByName('../cell/index')
            if (elements.length > 0) {
                const lastIndex = elements.length - 1
                elements.forEach((element, index) => {
                    element.updateIsLastElement(index === lastIndex)
                })
            }
        },
        getBoundingClientRect(callback) {
            useRect(`.${this.data.prefixCls}`, this)
                .then((rect) => {
                    if (!rect) return
                    callback.call(this, rect.height, rect)
                })
        },
    },
})
