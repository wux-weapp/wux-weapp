import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { fieldNamesProps } from '../helpers/mixins/fieldNamesBehavior'

baseComponent({
    externalClasses: ['wux-scroll-view-class'],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-cascader',
        },
        defaultValue: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.setActiveValue(newVal)
                    this.setInnerValue(newVal)
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        cancelText: {
            type: String,
            value: '取消',
        },
        confirmText: {
            type: String,
            value: '确定',
        },
        options: {
            type: Array,
            value: [],
        },
        full: {
            type: Boolean,
            value: false,
        },
        height: {
            type: [String, Number],
            value: 'auto',
        },
        chooseTitle: {
            type: String,
            value: '请选择',
        },
        visible: {
            type: Boolean,
            value: false,
            observer(shouldRender) {
                if (shouldRender) {
                    this.setShouldRender(true)
                }
            },
        },
        skipAnimation: {
            type: Boolean,
            value: false,
        },
        ...fieldNamesProps,
    },
    data: {
        shouldRender: false,
        innerValue: [],
        activeValue: [],
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`
            const toolbar = `${prefixCls}__toolbar`
            const inner = `${prefixCls}__inner`
            const cancel = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--cancel`]: true,
            })
            const confirm = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--confirm`]: true,
            })
            const hover = `${prefixCls}__button--hover`
            const title = `${prefixCls}__title`

            return {
                wrap,
                hd,
                bd,
                toolbar,
                inner,
                cancel,
                confirm,
                hover,
                title,
            }
        }],
    },
    methods: {
        setShouldRender(shouldRender) {
            if (this.data.shouldRender !== shouldRender) {
                this.setData({
                    shouldRender,
                })
            }
        },
        setActiveValue(activeValue, forceTrigger) {
            if (this.data.activeValue !== activeValue || forceTrigger) {
                this.setData({
                    activeValue,
                })
            }
        },
        setInnerValue(innerValue) {
            if (this.data.innerValue !== innerValue) {
                this.setData({
                    innerValue,
                })
            }
        },
        getValue(value = this.data.activeValue) {
            this.cascaderView = this.cascaderView || this.querySelector('#wux-cascader-view')
            return this.cascaderView && this.cascaderView.getValue(value)
        },
        /**
         * 切换面板的回调
         */
        onTabsChange(e) {
            this.triggerEvent('tabsChange', e.detail)
        },
        /**
         * 叶子节点加载的回调
         */
        onLoadOptions(e) {
            this.triggerEvent('load', e.detail)
        },
        /**
         * 选项改变时触发
         */
        onChange(e) {
            const { visible } = this.data
            const props = e.detail
            const { value: innerValue } = props

            this.setInnerValue(innerValue)

            if (visible) {
                this.triggerEvent('change', props)
            }
        },
        /**
         * 组件关闭时的回调函数
         */
        close() {
            this.triggerEvent('close')
        },
        /**
         * 组件关闭时重置其内部数据
         */
        onClosed() {
            const { activeValue: innerValue } = this.data

            this.setInnerValue(innerValue)
            this.setShouldRender(false)
        },
        /**
         * 点击确定按钮时的回调函数
         */
        onConfirm() {
            const { innerValue: activeValue } = this.data

            if (!this.data.controlled) {
                this.setActiveValue(activeValue, true)
            }

            this.triggerEvent('confirm', { ...this.getValue(activeValue) })
            this.close()
        },
        /**
         * 点击取消按钮时的回调函数
         */
        onCancel() {
            this.triggerEvent('cancel', { ...this.getValue() })
            this.close()
        },
        /**
         * 阻止移动触摸
         */
        noop() {},
    },
    attached() {
        const { defaultValue, value, controlled, visible: shouldRender } = this.data
        const activeValue = controlled ? value : defaultValue

        this.setActiveValue(activeValue)
        this.setInnerValue(activeValue)
        this.setShouldRender(shouldRender)
    },
})
