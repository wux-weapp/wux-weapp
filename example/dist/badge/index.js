Component({
    externalClasses: ['wux-class', 'wux-class-badge'],
    properties: {
        count: {
            type: Number,
            value: 0,
            observer(newVal) {
                const { overflowCount } = this.data
                const finalCount = newVal >= overflowCount ? `${overflowCount}+` : newVal

                this.setData({
                    finalCount,
                })
            },
        },
        overflowCount: {
            type: Number,
            value: 99,
        },
        dot: {
            type: Boolean,
            value: false,
        },
        showZero: {
            type: Boolean,
            value: false,
        },
        status: {
            type: String,
            value: '',
        },
        text: {
            type: String,
            value: '',
        },
    },
    data: {
        finalCount: 0,
    },
})