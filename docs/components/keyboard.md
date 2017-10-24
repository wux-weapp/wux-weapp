## keyboard(options)
键盘

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.className | <code>string</code> | 自定义类名 |
| options.titleText | <code>string</code> | 标题 |
| options.cancelText | <code>string</code> | 取消按钮的文字 |
| options.inputText | <code>string</code> | 提示文本 |
| options.showCancel | <code>boolean</code> | 是否显示取消按钮 |
| options.disorder | <code>boolean</code> | 是否打乱键盘 |
| options.callback | <code>function</code> | 输入完成后的回调函数 |

**Example**  
```html
<import src="../../components/keyboard/keyboard.wxml" />

<template is="keyboard" data="{{ ...$wux.keyboard }}" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">KeyBoard</view>
        <view class="page__desc">键盘</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="open">Open KeyBoard</button>
            <button class="weui-btn" type="default" bindtap="openWitdhDisorder">Open a disorderly KeyBoard</button>
            <button class="weui-btn" type="default" bindtap="openWithPromiseCallback">Open KeyBoard with promise callback</button>
            <button class="weui-btn" type="default" bindtap="openPlain">Plain theme</button>
            <button class="weui-btn" type="default" bindtap="openTimed">Open and close</button>
        </view>
    </view>
</view>
```

```js
import { $wuxKeyBoard } from '../../components/wux'

Page({
    data: {},
    onLoad() {},
    open() {
        $wuxKeyBoard.show({
            callback(value) {
                console.log(`输入的密码是：${value}`)
                return true
            },
        })
    },
    openWitdhDisorder() {
        $wuxKeyBoard.show({
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

        $wuxKeyBoard.show({
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

        $wuxKeyBoard.show({
            className: 'className',
            titleText: '安全键盘',
            cancelText: '取消',
            inputText: '输入数字密码',
            showCancel: true,
            disorder: false,
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
        const keyboard = $wuxKeyBoard.show({
            callback(value) {
                console.log(`输入的密码是：${value}`)
                return true
            },
        })

        setTimeout(keyboard.hide, 3000)
    },
})
```