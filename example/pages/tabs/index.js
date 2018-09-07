Page({
    data: {
        current: 'tab1',
        tabs: [
        	{
        		key: 'tab1',
        		title: 'Tab 1',
        		content: 'Content of tab 1',
        	},
        	{
        		key: 'tab2',
        		title: 'Tab 2',
        		content: 'Content of tab 2',
        	},
        	{
        		key: 'tab3',
        		title: 'Tab 3',
        		content: 'Content of tab 3',
        	},
        ],
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
    },
    onTabsChange(e) {
        console.log('onTabsChange', e)
        const { key } = e.detail
        const index = this.data.tabs.map((n) => n.key).indexOf(key)

        this.setData({
            key,
            index,
        })
    },
    onSwiperChange(e) {
    	console.log('onSwiperChange', e)
    	const { current: index, source } = e.detail
    	const { key } = this.data.tabs[index]

    	if (!!source) {
	    	this.setData({
	    		key,
	    		index,
	    	})
    	}
    },
})