import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'

baseComponent({
    relations: {
        '../skeleton-avatar/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.updated)
            },
        },
        '../skeleton-paragraph/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.updated)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-skeleton',
        },
        active: {
            type: Boolean,
            value: false,
            observer: 'updated',
        },
    },
    computed: {
        classes: ['prefixCls, active', function(prefixCls, active) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--active`]: active,
            })

            return {
                wrap,
            }
        }],
    },
    methods: {
        updated(active = this.data.active) {
            const avatar = this.getRelationsByName('../skeleton-avatar/index')
            const paragraph = this.getRelationsByName('../skeleton-paragraph/index')

            if (avatar.length > 0) {
                avatar.forEach((element) => {
                    element.updated(active)
                })
            }

            if (paragraph.length > 0) {
                paragraph.forEach((element) => {
                    element.updated(active)
                })
            }
        },
    },
})
