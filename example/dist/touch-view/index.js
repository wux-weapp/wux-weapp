import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import eventsMixin from '../helpers/mixins/eventsMixin'

const defaultEvents = {
    onClick() {},
}

baseComponent({
    behaviors: [eventsMixin({ defaultEvents })],
    relations: {
        '../cell-group/index': {
            type: 'ancestor',
        },
        '../picker/index': {
            type: 'parent',
        },
        '../date-picker/index': {
            type: 'parent',
        },
        '../popup-select/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-touch-view',
        },
        hoverClass: {
            type: String,
            value: 'none',
        },
        hoverStopPropagation: {
            type: Boolean,
            value: false,
        },
        hoverStartTime: {
            type: Number,
            value: 20,
        },
        hoverStayTime: {
            type: Number,
            value: 70,
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
    },
    data: {
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, hoverClass', function(prefixCls, hoverClass) {
            const wrap = classNames(prefixCls)
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                hover,
            }
        }],
    },
    methods: {
        onClick() {
            this.triggerEvent('click')
        },
    },
})
