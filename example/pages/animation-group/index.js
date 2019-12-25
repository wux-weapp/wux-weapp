import ad from '../index/ad'

ad({
    data: {
        animations: [
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
            'custom',
        ],
        example: {
            animation: 'fadeIn',
            classNames: 'wux-animate--fadeIn',
            enter: true,
            exit: true,
            in: false,
        },
    },
    onClick(e) {
        const { index } = e.currentTarget.dataset
        const animation = this.data.animations[index]
        const classNames = `wux-animate--${animation}`

        this.setData({
            'example.in': true,
            'example.classNames': classNames,
            'example.animation': animation,
        })
    },
    onEnter(e) {
        console.log('onEnter', e.detail)
    },
    onEntering(e) {
        console.log('onEntering', e.detail)
    },
    onEntered(e) {
        console.log('onEntered', e.detail)

        // delay 300ms close animation
        setTimeout(() => this.setData({ 'example.in': false }), 300)
    },
    onExit() {
        console.log('onExit')
    },
    onExiting() {
        console.log('onExiting')
    },
    onExited() {
        console.log('onExited')
    },
    onChange(e) {
        console.log('onChange', e.detail)
    },
})
