# KeyBoard 数字键盘

用于展现数字键盘。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "KeyBoard",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
        "wux-keyboard": "../../dist/keyboard/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-keyboard` 或其他，之后在 page.js 中调用 `$wuxKeyBoard(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-keyboard id="wux-keyboard" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">KeyBoard</view>
        <view class="page__desc">数字键盘</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="open">Open KeyBoard</wux-button>
        <wux-button block type="light" bind:click="openWitdhDisorder">Open a disorderly KeyBoard</wux-button>
        <wux-button block type="light" bind:click="openWithPromiseCallback">Open KeyBoard with promise callback</wux-button>
        <wux-button block type="light" bind:click="openPlain">Plain theme</wux-button>
        <wux-button block type="light" bind:click="openTimed">Open and close</wux-button>
    </view>
</view>
```

```js
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
        const hide = $wuxKeyBoard().show({
            callback(value) {
                console.log(`输入的密码是：${value}`)
                return true
            },
        })

        setTimeout(hide, 3000)
    },
})
```

## 视频演示

[KeyBoard](./_media/keyboard.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.className | <code>string</code> | 自定义类名 | - |
| options.titleText | <code>string</code> | 标题 | 安全键盘 |
| options.cancelText | <code>string</code> | 取消按钮的文字 | 取消 |
| options.inputText | <code>string</code> | 提示文本 | 输入数字密码 |
| options.showCancel | <code>boolean</code> | 是否显示取消按钮 | true |
| options.disorder | <code>boolean</code> | 是否打乱键盘 | false |
| options.callback | <code>function</code> | 输入完成后的回调函数 | - |