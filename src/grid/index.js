Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true
    },
    relations: {
        '../grids/index': {
            type: 'parent',
        },
    },
    properties: {
        thumb: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
    },
    data: {
        width: '100%',
        bordered: true,
        square: true,
        index: 0,
    },
    methods: {
    	changeCurrent(width, bordered, square, index) {
    		this.setData({
                width,
                bordered,
                square,
                index,
            })
    	},
        onTap() {
            this.triggerEvent('click', this.data)
        },
    },
})