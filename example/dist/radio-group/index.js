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
                elements.forEach((element, index) => {
                    element.changeValue(value === element.data.value, index)
                })
            }
        },
        emitEvent(item) {
            this.triggerEvent('change', { ...item, name: this.data.name })
        },
    },
})