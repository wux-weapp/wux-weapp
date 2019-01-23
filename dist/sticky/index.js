import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../sticky-item/index': {
            type: 'child',
            observer() {
                this.debounce(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-sticky',
        },
        scrollTop: {
            type: Number,
            value: 0,
            observer: 'onScroll',
        },
    },
    computed: {
        classes() {
            const { prefixCls } = this.data
            const wrap = classNames(prefixCls)

            return {
                wrap,
            }
        },
    },
    methods: {
        onScroll(scrollTop = this.data.scrollTop) {
            const elements = this.getRelationNodes('../sticky-item/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.onScroll(scrollTop)
                })
            }
        },
    	updated() {
    		const elements = this.getRelationNodes('../sticky-item/index')
            if (elements.length > 0) {
				elements.forEach((element, index) => {
				    element.updated(index)
				})
            }
    	},
    },
})
