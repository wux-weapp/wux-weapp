import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { safeAreaInset, checkIPhoneX } from '../helpers/checkIPhoneX'

baseComponent({
    relations: {
        '../tabbar-item/index': {
            type: 'child',
            observer() {
                this.debounce(this.updated)
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
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
            },
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
        classes: ['prefixCls, position', function(prefixCls, position) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${position}`]: position,
            })

            return {
                wrap,
            }
        }],
    },
    methods: {
        updated(activeKey = this.data.activeKey) {
            if (this.data.activeKey !== activeKey) {
                this.setData({ activeKey })
            }

            this.changeCurrent(activeKey)
        },
        changeCurrent(activeKey) {
            const elements = this.getRelationNodes('../tabbar-item/index')

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    const key = element.data.key || String(index)
                    const current = key === activeKey

                    element.changeCurrent(current, key, this.data.theme, elements.length)
                })
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data)
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
        applyIPhoneXShim(position = this.data.position) {
            if (checkIPhoneX()) {
                if (['bottom', 'top'].includes(position)) {
                    this.setData({ tabbarStyle: `${position}: ${safeAreaInset[position]}px` })
                }
            }
        },
    },
    ready() {
        const { defaultCurrent, current, controlled } = this.data
        const activeKey = controlled ? current : defaultCurrent

        this.updated(activeKey)
        this.applyIPhoneXShim()
    },
})
