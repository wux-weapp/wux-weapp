import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { useRect } from '../helpers/hooks/useDOM'

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
        brief: '',
    },
    observers: {
        ['name, index, top, height'](name, index) {
            const brief = name ? name.charAt(0) : index
            if (brief !== this.data.brief) {
                this.setData({
                    brief,
                })
            }

            const indexContext = this.getIndexContext()
            if (indexContext) {
                const { updateChildren } = indexContext.getInternalHooks('INDEX_HOOK_MARK')
                updateChildren()
            }
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`

            return {
                wrap,
                hd,
                bd,
            }
        }],
    },
    methods: {
        getIndexContext() {
            return this.getRelationsByName('../index/index')[0]
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
