import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../skeleton/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-skeleton-paragraph',
        },
        rows: {
            type: Number,
            value: 3,
        },
        rounded: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        active: false,
        rowList: [],
    },
    computed: {
        classes() {
            const { prefixCls, active, rounded } = this.data
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--active`]: active,
                [`${prefixCls}--rounded`]: rounded,
            })
            const row = `${prefixCls}__row`

            return {
                wrap,
                row,
            }
        },
    },
    methods: {
    	updated(active) {
            if (this.data.active !== active) {
                this.setData({
                    active,
                })
            }
        },
        updateRows(rows = this.data.rows) {
            this.setData({
                rowList: [...Array(rows)].map((_, index) => index),
            })
        },
    },
    attached() {
        this.updateRows()
    },
})
