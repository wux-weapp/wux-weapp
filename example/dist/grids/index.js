Component({
	externalClasses: ['wux-class'],
    relations: {
        '../grid/index': {
            type: 'child',
            linked() {
                this.changeCurrent()
            },
            linkChanged() {
                this.changeCurrent()
            },
            unlinked() {
                this.changeCurrent()
            },
        },
    },
    properties: {
        col: {
            type: Number,
            value: 3,
            observer: 'changeCurrent',
        },
        bordered: {
            type: Boolean,
            value: true,
            observer: 'changeCurrent',
        },
        square: {
            type: Boolean,
            value: false,
            observer: 'changeCurrent',
        },
    },
    methods: {
    	changeCurrent() {
    		const elements = this.getRelationNodes('../grid/index')
            const { col, bordered, square } = this.data
    		const colNum = parseInt(col) > 0 ? parseInt(col) : 1
    		const width = `${100 / colNum}%`

            if (elements.length > 0) {
				elements.forEach((element, index) => {
				    element.changeCurrent(width, bordered, square, index)
				})
            }
    	},
    },
})