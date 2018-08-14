Component({
	externalClasses: ['wux-class'],
	properties: {
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
            	if (!this.data.auto) {
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
        auto: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        activeKey: 0,
    },
    methods: {
    	onTap(e) {
    		if (this.data.disabled) {
    			return false
    		}

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
            	if (this.data.auto) {
            		this.setData({
                        activeKey,
                    })
            	}
            }

            this.emitEvent(activeKey)
        },
    },
    attached() {
        const { defaultCurrent, current, auto } = this.data
        const activeKey = !auto ? current : defaultCurrent

        if (this.data.activeKey !== activeKey) {
	        this.setData({
	        	activeKey,
	        })
    	}
    },
})