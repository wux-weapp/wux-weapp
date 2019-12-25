const adChace = {}

export default function ad(config) {
    const { onLoad, onUnload } = config
    let timeout = null

    config.onLoad = function() {
        let interstitialAd = adChace[this.route]

        if (onLoad) onLoad.call(this)
        if (wx.createInterstitialAd && !interstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-43f0133726683dec',
            })
            interstitialAd.onLoad(() => {
                console.log(`%c ${this.route} - ad: onLoad event emit`, 'color: #1890ff')
            })
            interstitialAd.onError((err) => {
                console.log(`%c ${this.route} - ad: onError event emit`, err, 'color: #1890ff')
            })
            interstitialAd.onClose((res) => {
                console.log(`%c ${this.route} - ad: onClose event emit`, res, 'color: #1890ff')
            })
        }

        if (interstitialAd) {
            timeout = setTimeout(() => {
                interstitialAd.show().catch((err) => {
                    console.error(`${this.route} - ad: onShow event emit`, err)
                })
            }, 3000)
        }
    }

    config.onUnload = function() {
        if (onUnload) onUnload.call(this)
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
    }

    return Page(config)
}
