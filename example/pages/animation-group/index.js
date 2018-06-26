Page({
    data: {
        items: [
            'fadeIn',
            'fadeInDown',
            'fadeInLeft',
            'fadeInRight',
            'fadeInUp',
            'slideInUp',
            'slideInDown',
            'slideInLeft',
            'slideInRight',
        ],
        index: 0,
        example: {
            classNames: 'wux-animate--fadeIn',
            enter: true,
            exit: true,
            in: false,
        },
    },
    pickerChange(e) {
        const index = e.detail.value
        const value = this.data.items[index]
        const classNames = `wux-animate--${value}`

        this.setData({
            index,
            'example.classNames': classNames,
        })
    },
    switchChange(e) {
        const { model } = e.currentTarget.dataset

        this.setData({
            [model]: e.detail.value,
        })
    },
    onClick() { console.log('onClick') },
    onEnter() { console.log('onEnter') },
    onEntering() { console.log('onEntering') },
    onEntered() { console.log('onEntered') },
    onExit() { console.log('onExit') },
    onExiting() { console.log('onExiting') },
    onExited() { console.log('onExited') },
})