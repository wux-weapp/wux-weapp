Component({
    externalClasses: ['wux-class'],
    properties: {
        type: {
            type: String,
            value: '',
        },
        size: {
            type: [String, Number],
            value: 32,
            observer: 'updated',
        },
        color: {
            type: String,
            value: '',
        },
        hidden: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        fontSize: '',
    },
    methods: {
        updated(size = this.data.size) {
            let fontSize = size

            if (typeof size === 'number') {
                fontSize = `${size}px`
            } else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = `${size}px`
                }
            }

            if (this.data.fontSize !== fontSize) {
                this.setData({
                    fontSize,
                })
            }
        },
    },
    attached() {
        this.updated()
    },
})
