## barcode(id, number, options)
条形码

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | canvas 组件的唯一标识符 |
| number | <code>number|</code> | 条形码的数值 |
| options | <code>object</code> | 配置项 |
| options.width | <code>number</code> | canvas 组件的宽度 |
| options.height | <code>number</code> | canvas 组件的高度 |
| options.number | <code>true</code> | 是否显示数字 |
| options.prefix | <code>true</code> | 是否显示国家前缀 |
| options.color | <code>string</code> | 条形码的颜色 |
| options.debug | <code>true</code> | 是否开启调试 |
| options.onValid | <code>function</code> | 验证条形码合法的回调函数 |
| options.onInvalid | <code>function</code> | 验证条形码不合法的回调函数 |
| options.onSuccess | <code>function</code> | 接口调用成功的回调函数 |
| options.onError | <code>function</code> | 接口调用失败的回调函数 |

**Example**  
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
                    <input type="number" class="weui-input" bindinput="bindinput" />
                </view>
            </view>
        </view>
        <view class="weui-cells__tips">提示：扫描只能识别有效的条形码</view>
        <canvas style="width: 200px; height: 100px; margin: 30px auto;" canvas-id="barcode"></canvas>
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
        this.$wuxBarcode = App.Wux().$wuxBarcode

        this.$wuxBarcode('barcode', '9787115335500')
    },
    bindinput(e) {
        const value = e.detail.value

        if (value.length > 13) return {
            value: value.substr(0, 13), 
        }

        this.setData({
            value, 
        })

        this.$wuxBarcode('barcode', value)
    },
})
```