## vcode(id, options)
验证码

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | canvas 组件的唯一标识符 |
| options | <code>object</code> | 配置项 |
| options.str | <code>string</code> | 验证码范围 |
| options.num | <code>number</code> | 验证码长度，默认值 6 |
| options.width | <code>number</code> | 画布宽度，默认值 120 |
| options.height | <code>number</code> | 画布高度，默认值 40 |
| options.bgColor | <code>string</code> | 画布背景色 |
| options.fontColor | <code>string</code> | 画布字体颜色 |
| options.hasPoint | <code>boolean</code> | 是否显示干扰点，默认 true |
| options.hasLine | <code>boolean</code> | 是否显示干扰线，默认 true |

**Example**  
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
                    <canvas class="weui-vcode-img" style="width: 120px; height: 40px;" canvas-id="vcode" bindtap="getDeafultVcode"></canvas>
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
                    <canvas class="weui-vcode-img" style="width: 120px; height: 40px;" canvas-id="custom_vcode" bindtap="getCustomVcode"></canvas>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
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
```