# Qrcode 二维码

用于展现二维码。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Qrcode",
    "usingComponents": {
        "wux-qrcode": "../../dist/qrcode/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Qrcode</view>
        <view class="page__desc">二维码</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">请输入文字，即时输入即时生成</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <textarea value="{{ value }}" bindinput="bindinput" class="weui-textarea" placeholder="支持文本、网址和电子邮箱" style="height: 4.2em" maxlength="300" />
                    <view class="weui-textarea-counter">{{ value.length }}/300</view>
                </view>
            </view>
        </view>
        <view class="weui-cells__tips">提示：Canvas 在微信中无法长按识别, 点击图片进入保存页面长按图片可以保存</view>
        <wux-qrcode wux-class="qrcode" data="{{ value }}" fg-color="{{ fgColor }}" width="200" height="200" bind:tap="previewImage" />
    </view>
</view>
```

```js
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
        wx.canvasToTempFilePath({
            canvasId: 'wux-qrcode',
            success: res => {
                wx.previewImage({
                    urls: [res.tempFilePath]
                })
            }
        })
    },
    randomColor() {
        const colorStr = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
        const length = colorStr.length
        const prefixStr = `000000`.substring(0, 6 - colorStr.length)
        return `#${prefixStr}${colorStr}`
    },
})
```

## 视频演示

[Qrcode](./_media/qrcode.mp4 ':include :type=iframe width=375px height=667px')

## API

### Qrcode props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| data | <code>string</code> | 文本内容 | - |
| typeNumber | <code>number</code> | 类型 | -1 |
| errorCorrectLevel | <code>number</code> | 误差校正等级 | 2 |
| width | <code>number</code> | canvas 组件的宽度 | 200 |
| height | <code>number</code> | canvas 组件的高度 | 200 |
| fgColor | <code>string</code> | 前景色 | black |
| bgColor | <code>string</code> | 背景色 | white |