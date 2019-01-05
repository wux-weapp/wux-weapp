import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../col/index': {
            type: 'child',
            observer() {
                this.updateStyle()
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-row',
        },
        gutter: {
            value: 0,
            type: Number,
            observer: 'updateStyle',
        },
    },
    data: {
        rowStyle: '',
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
