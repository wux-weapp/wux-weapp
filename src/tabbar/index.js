import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { safeAreaInset, checkIPhoneX } from '../helpers/checkIPhoneX'

baseComponent({
    relations: {
        '../tabbar-item/index': {
            type: 'child',
            observer() {
                this.debounce(this.changeCurrent)
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
            observer: 'changeCurrent',
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        position: {
            type: String,
            value: '',
        },
        safeArea: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        tabbarStyle: '',
        activeKey: '',
        keys: [],
    },
    computed: {
        classes() {
            const { prefixCls, position } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${position}`]: position,
            })

            return {
                wrap,
            }
        },
    },
    methods: {
        updated(activeKey, condition) {
            const elements = this.getRelationNodes('../tabbar-item/index')

            if (elements.length > 0) {
                if (condition) {
                    this.setData({
                        activeKey,
                    })

                    elements.forEach((element, index) => {
                        const key = element.data.key || String(index)
                        const current = key === activeKey

                        element.changeCurrent(current, key, this.data.theme, elements.length)
                    })
                }
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data)
                })
            }
        },
        changeCurrent(value = this.data.current) {
            this.updated(value, this.data.controlled)
        },
        emitEvent(key) {
            this.triggerEvent('change', {
                key,
                keys: this.data.keys,
            })
        },
        setActiveKey(activeKey) {
            if (this.data.activeKey !== activeKey) {
                this.updated(activeKey, !this.data.controlled)
            }

            this.emitEvent(activeKey)
        },
        applyIPhoneXShim(position = this.data.position) {
            if (checkIPhoneX()) {
                if (position === 'bottom' || position === 'top') {
                    this.setData({ tabbarStyle: `${position}: ${safeAreaInset[position]}px` })
                }
            }
        },
    },
    ready() {
        const { defaultCurrent, current, controlled } = this.data
        const activeKey = controlled ? current : defaultCurrent

        this.updated(activeKey, true)
        this.applyIPhoneXShim()
    },
})
