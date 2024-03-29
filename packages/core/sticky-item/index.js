import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { useRect } from '../helpers/hooks/useDOM'

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
        classes: ['prefixCls, isFixed', function(prefixCls, isFixed) {
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
        }],
    },
    methods: {
        onScroll(scrollTop) {
            const parent = this.getRelationsByName('../sticky/index')[0]
            const { top, height, index } = this.data
            const isFixed = scrollTop >= top && scrollTop < top + height

            if (this.data.isFixed !== isFixed) {
                this.setData({
                    isFixed,
                })

                if (parent) {
                    parent.triggerEvent(isFixed ? 'stick' : 'unstick', { index })
                }
            }
        },
    	updated(index) {
            useRect(`.${this.data.prefixCls}`, this)
                .then((rect) => {
                    if (!rect) return
                    this.setData({
                        top: rect.top,
                        height: rect.height,
                        index,
                    })
                })
    	},
    },
})
