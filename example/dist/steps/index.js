Component({
    externalClasses: ['wux-class'],
    properties: {
        current: {
            type: Number,
            value: 0,
            observer: 'updateCurrent',
        },
        // status: {
        //     type: String,
        //     value: '',
        // },
        direction: {
            type: String,
            value: 'horizontal',
        }
    },
    relations: {
        '../step/index': {
            type: 'child',
            linked() {
                this.updateCurrent()
            },
            linkChanged() {
                this.updateCurrent()
            },
            unlinked() {
                this.updateCurrent()
            },
        },
    },
    methods: {
        updateCurrent() {
            const elements = this.getRelationNodes('../step/index')
            const { current, direction } = this.data

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updateCurrent({
                        length: elements.length,
                        index,
                        current,
                        direction,
                    })
                })
            }
        }
    }
})