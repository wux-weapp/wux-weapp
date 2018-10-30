Component({
    externalClasses: ['wux-class'],
    behaviors: ['wx://form-field'],
    relations: {
        '../checkbox/index': {
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
            type: Array,
            value: [],
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
            const elements = this.getRelationNodes('../checkbox/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(value.includes(element.data.value), index)
                })
            }
        },
        emitEvent(item) {
            this.triggerEvent('change', { ...item, name: this.data.name })
        },
    },
})