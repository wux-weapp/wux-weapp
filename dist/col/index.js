import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../row/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-col',
        },
        span: {
            value: 0,
            type: Number,
        },
        offset: {
            value: 0,
            type: Number,
        },
        pull: {
            value: 0,
            type: Number,
        },
        push: {
            value: 0,
            type: Number,
        },
    },
    data: {
        colStyle: '',
    },
    computed: {
        classes: ['prefixCls, span, offset, pull, push', function(prefixCls, span, offset, pull, push) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--span-${span}`]: span,
                [`${prefixCls}--offset-${offset}`]: offset,
                [`${prefixCls}--pull-${pull}`]: pull,
                [`${prefixCls}--push-${push}`]: push,
            })

            return {
                wrap,
            }
        }],
    },
    methods: {
        updateStyle(colStyle) {
            if (this.data.colStyle !== colStyle) {
                this.setData({
                    colStyle,
                })
            }
        },
    },
})
