Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    relations: {
        '../tabbar/index': {
            type: 'parent',
        },
    },
    properties: {
        key: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        width: '100%',
        current: false,
        index: '0',
    },
    methods: {
        changeCurrent(current, index, theme, length) {
            const width = 100 / length + '%'

            this.setData({
                width,
                current,
                theme,
                index,
            })
        },
        onTap() {
            const { index, disabled } = this.data
            const parent = this.getRelationNodes('../tabbar/index')[0]

            if (disabled || !parent) {
                return false
            }

            this.triggerEvent('click', { index })

            parent.setActiveKey(index)
        },
    },
})