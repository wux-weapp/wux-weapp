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

Component({
    externalClasses: ['wux-class'],
    relations: {
        '../tab/index': {
            type: 'child',
            linked() {
                this.changeCurrent()
            },
            linkChanged() {
                this.changeCurrent()
            },
            unlinked() {
                this.changeCurrent()
            },
        },
    },
    properties: {
        current: {
            type: String,
            value: '',
            observer: 'changeCurrent',
        },
        scroll: {
            type: Boolean,
            value: false,
        },
        autofocus: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        keys: [],
    },
    methods: {
        changeCurrent(value = this.data.current) {
            const elements = this.getRelationNodes('../tab/index')

            if (elements.length > 0) {
                elements.forEach((element) => {
                    element.changeCurrent(element.data.key === value, this.data.scroll)
                })

                if (this.data.autofocus) {
                    const activeKey = getDefaultActiveKey(elements)
                    const { current } = this.data

                    if (current) {
                        if (!activeKeyIsValid(elements, current)) {
                            this.setActiveKey(activeKey)
                        }
                    } else {
                        this.setActiveKey(activeKey)
                    }
                }
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data)
                })
            }
        },
        emitEvent(key) {
            this.triggerEvent('change', { key, keys: this.data.keys })
        },
        setActiveKey(activeKey) {
            if (activeKey !== this.data.current) {
                this.setData({
                    current: activeKey,
                })
            }
        },
    },
})