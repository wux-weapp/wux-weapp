Component({
    externalClasses: ['wux-class'],
    relations: {
        '../accordion-group/index': {
            type: 'parent',
        },
    },
    properties: {
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