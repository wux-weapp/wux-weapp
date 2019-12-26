const adChace = {}
const adUnitIds = [
    'adunit-43f0133726683dec',
    'adunit-e0d329fbf15baad3',
    'adunit-d4d828a7202aa659',
    'adunit-77f75ec31751b42c',
    'adunit-776e9695447f0bd9',
    'adunit-731499e60b328a41',
    'adunit-92daaea26f101651',
    'adunit-e1e0fa16d8157808',
    'adunit-85594f587d807fbe',
    'adunit-40d51a741c1d1342',
]

export default function ad(config) {
    const { onLoad, onUnload } = config
    let timeout = null

    config.onLoad = function() {
        let interstitialAd = adChace[this.route]

        if (onLoad) onLoad.call(this)
        if (wx.createInterstitialAd && !interstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: adUnitIds[Math.floor(Math.random() * adUnitIds.length)],
            })
            interstitialAd.onLoad(() => {
                console.log(`%c ${this.route} - ad: onLoad event emit`, 'color: #1890ff')
            })
            interstitialAd.onError((err) => {
                console.log(`%c ${this.route} - ad: onError event emit`, 'color: #1890ff', err)
            })
            interstitialAd.onClose((res) => {
                console.log(`%c ${this.route} - ad: onClose event emit`, 'color: #1890ff', res)
            })
        }

        this.showInterstitialAd = this.showInterstitialAd || function() {
            if (interstitialAd) {
                timeout = setTimeout(() => {
                    interstitialAd.show().catch((err) => {
                        console.error(`${this.route} - ad: onShow event emit`, err)
                    })
                }, 3000)
            }
        }

        this.showInterstitialAd.call(this)
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
