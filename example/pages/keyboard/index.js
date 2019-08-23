import { $wuxKeyBoard } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    open() {
        $wuxKeyBoard().show({
            callback(value) {
                console.log(`输入的密码是：${value}`)
                return true
            },
        })
    },
    openWitdhDisorder() {
        $wuxKeyBoard().show({
            disorder: true,
            callback(value) {
                console.log(`输入的密码是：${value}`)
                return false
            },
        })
    },
    openWithPromiseCallback() {
        const http = (obj) => {
            return new Promise((resolve, reject) => {
                obj.success = (res) => resolve(res)
                obj.fail = (res) => reject(res)
                wx.request(obj)
            })
        }

        $wuxKeyBoard().show({
            callback(value) {
                console.log(`输入的密码是：${value}`)

                wx.showLoading({
                    title: '验证支付密码'
                })

                return http({
                        url: 'https://www.skyvow.cn/api/user/sign/in',
                        method: 'POST',
                        data: {
                            username: 'admin',
                            password: value
                        }
                    })
                    .then(res => {
                        const data = res.data

                        console.log(data)

                        wx.hideLoading()

                        wx.showToast({
                            title: data.meta.message,
                            duration: 3000,
                        })

                        if (data.meta.code !== 0) {
                            return Promise.reject(data.meta.message)
                        }
                    })
            },
        })
    },
    openPlain() {
        const fn = (title) => {
            wx.hideLoading()
            wx.showToast({
                title,
                duration: 3000,
            })
        }

        $wuxKeyBoard().show({
            className: 'className',
            titleText: '安全键盘',
            cancelText: '取消',
            inputText: '输入数字密码',
            showCancel: true,
            disorder: false,
            maxlength: 4,
            closeOnReject: false,
            callback(value) {
                console.log(`输入的密码是：${value}`)

                wx.showLoading({
                    title: '验证支付密码'
                })

                return new Promise((resolve, reject) => {
                    setTimeout(() => Math.ceil(Math.random() * 10) >= 6 ? resolve(fn('密码正确')) : reject(fn('密码错误')), 3000)
                })
            },
        })
    },
    openTimed() {
        clearTimeout(this.timeout)

        const hide = $wuxKeyBoard().show({
            password: false,
            maxlength: -1,
            onChange(value) {
                console.log(`输入的密码是：${value}`)
            },
            onClose(value) {
                return false
            },
        })

        this.timeout = setTimeout(hide, 3000)
    },
})