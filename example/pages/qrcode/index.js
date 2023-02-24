import ad from '../index/ad'

const ratio = wx.getSystemInfoSync().pixelRatio

ad({
    data: {
        value: 'https://github.com/wux-weapp/wux-weapp',
        fgColor: 'black',
        whiteSpace: 10,
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
        console.log('onSliderChange', e.detail)
        const whiteSpace = e.detail.value[0]
        if (this.data.whiteSpace !== whiteSpace) {
            this.setData({
                whiteSpace,
            })
        }
    },
    QRCodeLoad(e) {
        console.log('QRCodeLoad', e.detail)
    },
    QRCodeError(e) {
        console.log('QRCodeError', e.detail)
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
            destWidth: 200 * ratio,
            destHeight: 200 * ratio,
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
            destWidth: 200 * ratio,
            destHeight: 200 * ratio,
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
