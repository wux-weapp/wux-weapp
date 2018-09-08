# Vcode 验证码

用于展现验证码。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Vcode",
    "usingComponents": {
        "wux-vcode": "../../dist/vcode/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Vcode</view>
        <view class="page__desc">验证码</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">默认 & 自定义</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input weui-cell_vcode">
                <view class="weui-cell__hd">
                    <view class="weui-label">验证码</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入验证码" />
                </view>
                <view class="weui-cell__ft" style="text-align: left">
                    <wux-vcode bind:change="onChange" />
                </view>
            </view>
            <view class="weui-cell weui-cell_input weui-cell_vcode">
                <view class="weui-cell__hd">
                    <view class="weui-label">验证码</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入验证码" />
                </view>
                <view class="weui-cell__ft" style="text-align: left">
                    <wux-vcode canvas-id="custom-canvas" bg-color="#e6f6ff" font-color="#165189" has-point="{{ false }}" has-line="{{ false }}" bind:change="onChange" />
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
Page({
    data: {},
    onLoad() {},
    onChange(e) {
        console.log(`验证码：${e.detail.value}`)
    },
})
```

## 视频演示

[Vcode](./_media/vcode.mp4 ':include :type=iframe width=375px height=667px')

## API

### Vcode props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| str | <code>string</code> | 验证码范围 | ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 |
| num | <code>number</code> | 验证码长度 | 6 |
| width | <code>number</code> | 画布宽度 | 120 |
| height | <code>number</code> | 画布高度 | 40 |
| bgColor | <code>string</code> | 画布背景色 | - |
| fontColor | <code>string</code> | 画布字体颜色 | - |
| hasPoint | <code>boolean</code> | 是否显示干扰点 | true |
| hasLine | <code>boolean</code> | 是否显示干扰线 | true |
| bind:change | <code>function</code> | 点击事件的回调函数 | - |