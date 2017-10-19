## xnumber(id, options)
数字输入框

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.min | <code>number</code> | 最小值 |
| options.max | <code>number</code> | 最大值 |
| options.step | <code>number</code> | 计数间隔 |
| options.value | <code>number</code> | 默认值 |
| options.disabled | <code>boolean</code> | 禁用输入 |
| options.longpress | <code>boolean</code> | 禁用长按 |
| options.className | <code>string</code> | 自定义类名 |
| options.callback | <code>function</code> | 监听值变化的回调函数 |

**Example**  
```html
<import src="../../components/xnumber/xnumber.wxml" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Xnumber</view>
        <view class="page__desc">数字输入框</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">默认</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num1 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置 callback 回调函数，在调试窗口中输出</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num2 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置宽度为100px</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num3 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置步长为0.5</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num4 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置值为1，最小值为-5，最大值为8</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num5 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置可输入</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num6 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置长按快速加减</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num7 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">循环输出多个组件</view>
        <view class="weui-cells weui-cells_after-title">
            <block wx:for="{{ items }}" wx:key="">
                <view class="weui-cell">
                    <view class="weui-cell__bd">{{ item.text }}</view>
                    <view class="weui-cell__ft">
                        <template is="xnumber" data="{{ ...$wux.xnumber[item.id] }}" />
                    </view>
                </view>
            </block>
        </view>
    </view>
</view>
```

```js
import { $wuxXnumber } from '../../components/wux'

Page({
    data: {
        items: [{
                id: '001',
                text: '房间',
                value: 1,
            },
            {
                id: '002',
                text: '成人',
                value: 2,
            },
        ],
    },
    onLoad() {
        $wuxXnumber.init('num1')

        $wuxXnumber.init('num2', {
            callback: (value) => console.log(value),
        })

        $wuxXnumber.init('num3', {
            className: 'custom-xnumber',
        })

        $wuxXnumber.init('num4', {
            step: .5,
        })

        $wuxXnumber.init('num5', {
            min: -5,
            max: 8,
            value: 1,
        })

        $wuxXnumber.init('num6', {
            disabled: !1,
        })

        $wuxXnumber.init('num7', {
            longpress: !0,
        })

        this.data.items.forEach(n => $wuxXnumber.init(n.id, {
            value: n.value,
            callback: (value) => console.log(`已选择${n.text}数量：${value}`),
        }))
    },
})
```