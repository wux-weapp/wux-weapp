import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../sticky/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-sticky-item',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
    },
    data: {
        isFixed: false,
        index: 0,
        top: 0,
        height: 0,
    },
    computed: {
        classes() {
            const { prefixCls, isFixed } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--fixed`]: isFixed,
            })
            const hd = `${prefixCls}__hd`
            const title = `${prefixCls}__title`
            const bd = `${prefixCls}__bd`
            const content = `${prefixCls}__content`

            return {
                wrap,
                hd,
                title,
                bd,
                content,
            }
        },
    },
    methods: {
        onScroll(scrollTop) {
            const { top, height } = this.data
            const isFixed = scrollTop >= top && scrollTop < top + height

            if (isFixed !== this.data.isFixed) {
                this.setData({
                    isFixed,
                })
            }
        },
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
