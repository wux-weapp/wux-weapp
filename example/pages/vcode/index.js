import ad from '../index/ad'

ad({
    data: {},
    onLoad() {},
    onChange(e) {
        console.log(`验证码：${e.detail.value}`)
    },
    onClick() {
        const canvas = this.selectComponent('#custom-canvas')
        canvas && canvas.draw()
    },
})
