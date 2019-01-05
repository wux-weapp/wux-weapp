import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../accordion-group/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-accordion',
        },
        key: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        showArrow: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        current: false,
        index: '0',
    },
    computed: {
        classes() {
            const { prefixCls, current, disabled } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--current`]: current,
                [`${prefixCls}--disabled`]: disabled,
            })
            const hd = `${prefixCls}__hd`
            const thumb = `${prefixCls}__thumb`
            const title = `${prefixCls}__title`
            const arrow = `${prefixCls}__arrow`
            const bd = `${prefixCls}__bd`
            const content = `${prefixCls}__content`

            return {
                wrap,
                hd,
                thumb,
                title,
                arrow,
                bd,
                content,
            }
        },
    },
    methods: {
        changeCurrent(current, index) {
            this.setData({
                current,
                index,
            })
        },
        onTap() {
            const { index, disabled } = this.data
            const parent = this.getRelationNodes('../accordion-group/index')[0]

            if (disabled || !parent) {
                return false
            }

            parent.onClickItem(index)
        },
    },
})
