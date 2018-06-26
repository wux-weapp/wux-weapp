Page({
    data: {
        items: [{
                id: '001',
                text: 'Face',
                value: 1,
            },
            {
                id: '002',
                text: 'Eye',
                value: 2,
            },
        ],
        slider: 0,
        value: 3,
    },
    sliderChange(e) {
        this.setData({
            slider: e.detail.value,
        })
    },
    onChange(e) {
        this.setData({
            value: e.detail.value,
        })
        console.log(e)
    },
})