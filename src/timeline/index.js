Component({
	externalClasses: ['wux-class'],
    relations: {
        '../timeline-item/index': {
            type: 'child',
            linked() {
                this.updateIsLastElement()
            },
            linkChanged() {
                this.updateIsLastElement()
            },
            unlinked() {
                this.updateIsLastElement()
            },
        },
    },
    properties: {
        pending: {
            type: Boolean,
            value: false,
        },
        position: {
            type: String,
            value: 'left',
        },
    },
    methods: {
    	updateIsLastElement() {
            const elements = this.getRelationNodes('../timeline-item/index')
            if (elements.length > 0) {
                const lastIndex = elements.length - 1
                const { pending, position } = this.data
                elements.forEach((element, index) => {
                    const isLast = pending ? index === Math.max(0, lastIndex - 1) : index === lastIndex
                    const isPending = pending && index === lastIndex
                    element.updateIsLastElement({
                        index,
                        isLast,
                        isPending,
                        pending,
                        position,
                    })
                })
            }
        },
    },
})