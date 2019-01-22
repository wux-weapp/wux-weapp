import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../index/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-index-item',
        },
        name: {
            type: String,
            value: '',
        },
    },
    data: {
        index: 0,
        top: 0,
        height: 0,
    },
    computed: {
        classes() {
            const { prefixCls } = this.data
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`

            return {
                wrap,
                hd,
                bd,
            }
        },
    },
    methods: {
    	updated(index) {
            const className = `.${this.data.prefixCls}`
            wx
                .createSelectorQuery()
                .in(this)
                .select(className)
                .boundingClientRect((rect) => {
                    if (!rect) return

                    this.setData({
                        top: rect.top,
                        height: rect.height,
                        index,
                    })
                })
                .exec()
        },
    },
})
