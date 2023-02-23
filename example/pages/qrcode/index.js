import ad from '../index/ad'

ad({
    data: {
        value: 'https://github.com/wux-weapp/wux-weapp',
        fgColor: 'black',
        whiteSpace: [10],
        qrcodeStatus: 'expired',
    },
    onChange(e) {
        const value = e.detail.value
        const fgColor = this.randomColor()

        this.setData({
            value,
            fgColor,
        })
    },
    onSliderChange(e) {
        const value = e.detail.value
        this.setData({
            whiteSpace: [value],
        })
    },
    onRefresh() {
        console.log('onRefresh')
        setTimeout(() => {
            this.setData({
                qrcodeStatus: 'loading',
            })
            setTimeout(() => {
                if (Math.random() > .5) {
                    this.setData({
                        qrcodeStatus: 'activated',
                        value: 'https://www.wuxui.com',
                    })
                } else {
                    this.setData({
                        qrcodeStatus: 'expired',
                    })
                }
            }, 1500)
        })
    },
    previewImage() {
        // 在自定义组件下，当前组件实例的 this，以操作组件内 <canvas> 组件
        const that = this.selectComponent('#qrcode')
        // 获取 canvas 组件实例
        const canvas = that.getCanvasNode()
        wx.canvasToTempFilePath({
            canvas,
            success: (res) => {
                wx.previewImage({
                    urls: [res.tempFilePath],
                })
            },
        }, that)
    },
    downloadQRCode() {
        // 在自定义组件下，当前组件实例的 this，以操作组件内 <canvas> 组件
        const that = this.selectComponent('#qrcode')
        // 获取 canvas 组件实例
        const canvas = that.getCanvasNode()
        wx.canvasToTempFilePath({
            canvas,
            success: (res) => {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                })
            },
        }, that)
    },
    randomColor() {
        const colorStr = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
        const length = colorStr.length
        const prefixStr = '000000'.substring(0, 6 - colorStr.length)
        return `#${prefixStr}${colorStr}`
    },
})
