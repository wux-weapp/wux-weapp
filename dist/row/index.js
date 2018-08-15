Component({
	externalClasses: ['wux-class'],
    relations: {
        '../col/index': {
            type: 'child',
            linked() {
                this.updateStyle()
            },
            linkChanged() {
                this.updateStyle()
            },
            unlinked() {
                this.updateStyle()
            },
        },
    },
    properties: {
        gutter: {
            value: 0,
            type: Number,
            observer: 'updateStyle',
        },
    },
    data: {
        rowStyle: '',
    },
    methods: {
    	updateStyle(gutter = this.data.gutter) {
    		const elements = this.getRelationNodes('../col/index')
            const rowStyle = gutter > 0 ? `margin-left: ${gutter / -2}px; margin-right: ${gutter / -2}px` : ''
    		const colStyle = gutter > 0 ? `padding-left: ${gutter / 2}px; padding-right: ${gutter / 2}px` : ''

            if (elements.length > 0) {
				elements.forEach((element) => {
				    element.updateStyle(colStyle)
				})
            }

            this.setData({
            	rowStyle,
            })
    	},
    },
})