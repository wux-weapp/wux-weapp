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