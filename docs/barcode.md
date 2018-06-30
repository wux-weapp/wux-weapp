# Barcode 条形码

用于展现条形码。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Barcode",
    "usingComponents": {
        "wux-barcode": "../../dist/barcode/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Barcode</view>
        <view class="page__desc">条形码</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">请输入13位条形码，即时输入即时生成</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__bd">
                    <input value="{{ number }}" type="number" class="weui-input" bindinput="bindinput" />
                </view>
            </view>
        </view>
        <view class="weui-cells__tips">提示：扫描只能识别有效的条形码</view>
        <wux-barcode wux-class="barcode" number="{{ number }}" options="{{ options }}" width="200" height="100" />
    </view>
</view>
```

```js
Page({
    data: {
        number: '9787115335524',
        options: {
            // number: true,
            // prefix: true,
            // color: 'black',
            // debug: false,
            onValid() { console.log('onValid') },
            onInvalid() { console.log('onInvalid') },
            onSuccess() { console.log('onSuccess') },
            onError() { console.log('onError') },
        }
    },
    onLoad() {},
    bindinput(e) {
        this.setData({
            number: e.detail.value,
        })
    },
})
```

## 视频演示

[Barcode](./_media/barcode.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| canvasId | <code>string</code> | canvas 组件的唯一标识符 | wux-barcode |
| number | <code>number</code> | 条形码的数值 | - |
| width | <code>number</code> | canvas 组件的宽度 | 200 |
| height | <code>number</code> | canvas 组件的高度 | 100 |
| options | <code>object</code> | 配置项 | - |
| options.number | <code>true</code> | 是否显示数字 | true |
| options.prefix | <code>true</code> | 是否显示国家前缀 | true |
| options.color | <code>string</code> | 条形码的颜色 | black |
| options.debug | <code>true</code> | 是否开启调试 | false |
| options.onValid | <code>function</code> | 验证条形码合法的回调函数 | - |
| options.onInvalid | <code>function</code> | 验证条形码不合法的回调函数 | - |
| options.onSuccess | <code>function</code> | 接口调用成功的回调函数 | - |
| options.onError | <code>function</code> | 接口调用失败的回调函数 | - |