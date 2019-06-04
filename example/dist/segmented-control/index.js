import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
	properties: {
        prefixCls: {
            type: String,
            value: 'wux-segment',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        defaultCurrent: {
            type: Number,
            value: 0,
        },
        current: {
            type: Number,
            value: 0,
            observer(newVal) {
            	if (this.data.controlled) {
            		this.setData({
            			activeKey: newVal,
            		})
            	}
            },
        },
        values: {
            type: Array,
            value: [],
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeKey: 0,
    },
    computed: {
        classes: ['prefixCls, theme, disabled', function(prefixCls, theme, disabled) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
                [`${prefixCls}--disabled`]: disabled,
            })
            const item = `${prefixCls}__item`

            return {
                wrap,
                item,
            }
        }],
    },
    methods: {
    	onTap(e) {
    		if (this.data.disabled) return
    		this.setActiveKey(e.currentTarget.dataset.index)
    	},
    	emitEvent(key) {
            this.triggerEvent('change', {
                key,
                values: this.data.values,
            })
        },
        setActiveKey(activeKey) {
            if (this.data.activeKey !== activeKey) {
            	if (!this.data.controlled) {
            		this.setData({
                        activeKey,
                    })
            	}
            }

            this.emitEvent(activeKey)
        },
    },
    attached() {
        const { defaultCurrent, current, controlled } = this.data
        const activeKey = controlled ? current : defaultCurrent

        if (this.data.activeKey !== activeKey) {
	        this.setData({
	        	activeKey,
	        })
    	}
    },
})
