Page({
    data: {
        value: 'https://github.com/skyvow/wux',
        fgColor: 'black',
    },
    onLoad() {},
    bindinput(e) {
        const value = e.detail.value
        const fgColor = this.randomColor()

        this.setData({
            value,
            fgColor,
        })
    },
    previewImage() {
        // 在自定义组件下，当前组件实例的 this，以操作组件内 <canvas> 组件
        const that = this.selectComponent('#qrcode')
        
        wx.canvasToTempFilePath({
            canvasId: 'wux-qrcode',
            success: (res) => {
                wx.previewImage({
                    urls: [res.tempFilePath]
                })
            }
        }, that)
    },
    randomColor() {
        const colorStr = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
        const length = colorStr.length
        const prefixStr = `000000`.substring(0, 6 - colorStr.length)
        return `#${prefixStr}${colorStr}`
    },
})