Component({
    externalClasses: ['wux-class'],
    behaviors: ['wx://form-field'],
    relations: {
        '../radio/index': {
            type: 'child',
            linked() {
                this.changeValue()
            },
            linkChanged() {
                this.changeValue()
            },
            unlinked() {
                this.changeValue()
            },
        },
    },
    properties: {
        value: {
            type: String,
            value: '',
            observer: 'changeValue',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
    },
    methods: {
        changeValue(value = this.data.value) {
            const elements = this.getRelationNodes('../radio/index')
            if (elements.length > 0) {
                elements.forEach((element) => {
                    element.changeValue(value === element.data.value)
                })
            }
        },
        emitEvent(value) {
            this.triggerEvent('change', value)
        },
    },
})