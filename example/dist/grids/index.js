import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../grid/index': {
            type: 'child',
            observer() {
                this.debounce(this.changeCurrent)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-grids',
        },
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
    computed: {
        classes() {
            const { prefixCls, bordered } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--bordered`]: bordered,
            })

            return {
                wrap,
            }
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
