Page({
    data: {
        // 和tabs-key对应位Number类型
        //详细页面也与tabs的key对应
        current: 1,
        tabs: [{
                key: 0,
                title: 'Tab 0',
                content: 'Content of tab 0',
            },
            {
                key: 1,
                title: 'Tab 1',
                content: 'Content of tab 1',
            },
            {
                key: 2,
                title: 'Tab 2',
                content: 'Content of tab 2',
            }
        ]
    },

    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
    },
    onTabsChange(e) {
        console.log('onTabsChange', e)
        console.log(e)
        const {
            key: current,
        } = e.detail
        this.setData({
            current
        })
    },


    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const {
            current,
            source
        } = e.detail
        if (!!source) {
            this.setData({
                current
            })
        }
    }
})
