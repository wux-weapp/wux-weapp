Page({
    data: {
    	items: [{
    		value: '1',
    		label: 'Wux'
    	}, {
    		value: '2',
    		label: 'Weapp'
    	}],
    	value: '1',
        checked: false,
    },
    onCheckboxChange(e) {
        console.log(e)
        this.setData({
            checked: e.detail.checked,
        })
    },
    onChange(e) {
    	console.log(e)
    	this.setData({
    		value: e.detail.value,
    	})
    },
})