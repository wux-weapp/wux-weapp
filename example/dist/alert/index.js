Component({
	externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
        theme: {
            type: String,
            value: 'balanced',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        closable: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        visible: true,
    },
    methods: {
        onClose() {
            if (this.data.closable) {
                this.setData({
                    visible: false
                })
            }
            this.triggerEvent('click')
        },
        onClick() {
            this.triggerEvent('click')
        },
    },
})