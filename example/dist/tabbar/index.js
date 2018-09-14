Component({
    externalClasses: ['wux-class'],
    relations: {
        '../tabbar-item/index': {
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
        defaultCurrent: {
            type: String,
            value: '',
        },
        current: {
            type: String,
            value: '',
            observer: 'changeCurrent',
        },
        auto: {
            type: Boolean,
            value: true,
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        position: {
            type: String,
            value: '',
        },
    },
    data: {
        activeKey: '',
        keys: [],
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
            this.updated(value, !this.data.auto)
        },
        emitEvent(key) {
            this.triggerEvent('change', {
                key,
                keys: this.data.keys,
            })
        },
        setActiveKey(activeKey) {
            if (this.data.activeKey !== activeKey) {
                this.updated(activeKey, this.data.auto)
            }

            this.emitEvent(activeKey)
        },
    },
    ready() {
        const { defaultCurrent, current, auto } = this.data
        const activeKey = !auto ? current : defaultCurrent

        this.updated(activeKey, true)
    },
})