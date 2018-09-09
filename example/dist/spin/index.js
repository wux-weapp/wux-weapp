Component({
    externalClasses: ['wux-class'],
    properties: {
        tip: {
            type: String,
            value: '',
        },
        size: {
            type: String,
            value: 'default',
        },
        spinning: {
            type: Boolean,
            value: true,
            observer: 'updated',
        },
        nested: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        spinVisible: true,
    },
    methods: {
        updated(spinVisible) {
            if (this.data.nested) {
                this.setData({
                    spinVisible,
                })
            }
        },
    },
})