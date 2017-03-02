## qrcode(id, data, options)
二维码

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | canvas 组件的唯一标识符 |
| data | <code>string</code> | 文本内容 |
| options | <code>object</code> | 配置项 |
| options.typeNumber | <code>number</code> | 类型 |
| options.errorCorrectLevel | <code>number</code> | 误差校正等级 |
| options.width | <code>number</code> | canvas 组件的宽度 |
| options.height | <code>number</code> | canvas 组件的高度 |
| options.fgColor | <code>string</code> | 前景色 |
| options.bgColor | <code>string</code> | 背景色 |

**Example**  
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
        <view class="weui-cells__tips">提示：Canvas在微信中无法长按识别</view>
        <canvas style="width: 200px; height: 200px; margin: 30px auto;" canvas-id="qrcode"></canvas>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {
        value: '', 
    },
    onLoad() {
        this.$wuxQrcode = App.Wux().$wuxQrcode

        this.$wuxQrcode.init('qrcode', 'wux')
    },
    bindinput(e) {
        const value = e.detail.value

        this.setData({
            value, 
        })

        this.$wuxQrcode.init('qrcode', value)
    },
})
```