import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'

baseComponent({
    relations: {
        '../sticky-item/index': {
            type: 'child',
            observer() {
                this.callDebounceFn(this.updated)
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
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)

            return {
                wrap,
            }
        }],
    },
    methods: {
        onScroll(scrollTop = this.data.scrollTop) {
            const elements = this.getRelationsByName('../sticky-item/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.onScroll(scrollTop)
                })
            }
        },
    	updated() {
    		const elements = this.getRelationsByName('../sticky-item/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
				    element.updated(index)
                })
            }
    	},
    },
})
