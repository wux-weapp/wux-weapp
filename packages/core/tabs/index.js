import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const getDefaultActiveKey = (elements) => {
    const target = elements.filter((element) => !element.data.disabled)[0]
    if (target) {
        return target.data.key
    }
    return null
}

const activeKeyIsValid = (elements, key) => {
    return elements.map((element) => element.data.key).includes(key)
}

const getActiveKey = (elements, activeKey) => {
    const defaultActiveKey = getDefaultActiveKey(elements)
    return !activeKey ? defaultActiveKey : !activeKeyIsValid(elements, activeKey) ? defaultActiveKey : activeKey
}

baseComponent({
    relations: {
        '../tab/index': {
            type: 'child',
            observer() {
                this.debounce(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-tabs',
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
        scroll: {
            type: Boolean,
            value: false,
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        direction: {
            type: String,
            value: 'horizontal',
        },
    },
    data: {
        activeKey: '',
        keys: [],
    },
    computed: {
        classes: ['prefixCls, direction, scroll', function(prefixCls, direction, scroll) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${direction}`]: direction,
                [`${prefixCls}--scroll`]: scroll,
            })

            return {
                wrap,
            }
        }],
    },
    methods: {
        updated(value = this.data.activeKey) {
            const elements = this.getRelationNodes('../tab/index')
            const activeKey = getActiveKey(elements, value)

            if (this.data.activeKey !== activeKey) {
                this.setData({ activeKey })
            }

            this.changeCurrent(activeKey, elements)
        },
        changeCurrent(activeKey, elements) {
            const { scroll, theme, direction } = this.data

            if (elements.length > 0) {
                elements.forEach((element) => {
                    element.changeCurrent({
                        current: element.data.key === activeKey,
                        scroll,
                        theme,
                        direction,
                    })
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
    },
    ready() {
        const { defaultCurrent, current, controlled } = this.data
        const activeKey = controlled ? current : defaultCurrent

        this.updated(activeKey)
    },
})
