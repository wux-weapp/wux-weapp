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
            'zoom',
            'punch',
        ],
        index: 0,
        example: {
            classNames: 'wux-animate--fadeIn',
            enter: true,
            exit: true,
            in: false,
        },
        show: false,
        status: '',
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
    onEnter(e) { console.log('onEnter', e.detail) },
    onEntering(e) { console.log('onEntering', e.detail) },
    onEntered(e) { console.log('onEntered', e.detail) },
    onExit() { console.log('onExit') },
    onExiting() { console.log('onExiting') },
    onExited() { console.log('onExited') },
    onToggle() {
        this.setData({
            show: !this.data.show,
        })
    },
    onChange(e) {
        const { animateStatus } = e.detail

        switch (animateStatus) {
            case 'entering':
                this.setData({ status: 'Entering…' })
                break
            case 'entered':
                this.setData({ status: 'Entered!' })
                break
            case 'exiting':
                this.setData({ status: 'Exiting…' })
                break
            case 'exited':
                this.setData({ status: 'Exited!' })
                break
        }
    },
})
