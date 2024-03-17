import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { safeAreaProps } from '../helpers/mixins/safeAreaBehavior'

baseComponent({
    relations: {
        '../tabbar-item/index': {
            type: 'child',
            observer() {
                this.callDebounceFn(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-tabbar',
        },
        defaultCurrent: {
            type: String,
            value: '',
        },
        current: {
            type: String,
            value: '',
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        backgroundColor: {
            type: String,
            value: '#fff',
        },
        position: {
            type: String,
            value: '',
        },
        ...safeAreaProps,
    },
    data: {
        tabbarStyle: '',
        activeKey: '',
        keys: [],
    },
    computed: {
        classes: ['prefixCls, position', function(prefixCls, position) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${position}`]: position,
            })
            const tabbar = `${prefixCls}-wrap`

            return {
                wrap,
                tabbar,
            }
        }],
    },
    observers: {
        current(newVal) {
            if (this.data.controlled) {
                this.updated(newVal)
            }
        },
        backgroundColor(newVal) {
            this.updateStyle(newVal)
        },
    },
    methods: {
        updated(activeKey = this.data.activeKey) {
            if (this.data.activeKey !== activeKey) {
                this.setData({ activeKey })
            }

            this.changeCurrent(activeKey)
        },
        changeCurrent(activeKey) {
            const elements = this.getRelationsByName('../tabbar-item/index')

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    const key = element.data.key || String(index)
                    const current = key === activeKey

                    element.changeCurrent(current, key, this.data.theme, elements.length)
                })
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data),
                })
            }
        },
        emitEvent(key) {
            this.triggerEvent('change', {
                key,
                keys: this.data.keys,
            })
        },
        setActiveKey(activeKey) {
            if (!this.data.controlled) {
                this.updated(activeKey)
            }

            this.emitEvent(activeKey)
        },
        updateStyle(backgroundColor) {
            const tabbarStyle = styleToCssString({
                backgroundColor,
            })
            
            if (tabbarStyle !== this.data.tabbarStyle) {
                this.setData({
                    tabbarStyle,
                })
            }
        },
    },
    ready() {
        const { defaultCurrent, current, controlled, backgroundColor } = this.data
        const activeKey = controlled ? current : defaultCurrent

        this.updated(activeKey)
        this.updateStyle(backgroundColor)
    },
})
