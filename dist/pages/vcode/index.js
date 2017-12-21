import { $wuxVcode } from '../../components/wux'

Page({
    data: {},
    onLoad() {
        this.getDeafultVcode()
        this.getCustomVcode()
    },
    getDeafultVcode() {
        if (!this.defaultVcode) {
            this.defaultVcode = $wuxVcode.init('vcode')
        }

        this.defaultVcode.draw(true, (value) => {
            console.log(`验证码：${value}`)
        })
    },
    getCustomVcode() {
        if (!this.customVcode) {
            this.customVcode = $wuxVcode.init('custom_vcode', {
                num: 6,
                width: 120,
                height: 40,
                bgColor: '#e6f6ff',
                fontColor: '#165189',
                hasPoint: false,
                hasLine: false,
            })
        }

        this.customVcode.draw(true, (value) => {
            console.log(`验证码：${value}`)
        })
    },
})