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
<import src="../../components/xnumber/xnumber.wxml"/>

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
                    <template is="xnumber" data="{{ ...$wux.xnumber.num1 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置 callback 回调函数，在调试窗口中输出</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num2 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置宽度为100px</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num3 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置步长为0.5</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num4 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置值为1，最小值为-5，最大值为8</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num5 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置可输入</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num6 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置长按快速加减</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <template is="xnumber" data="{{ ...$wux.xnumber.num7 }}"/>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {},
    onLoad() {
        this.$wuxXnumber = App.Wux().$wuxXnumber

        this.$wuxXnumber.init('num1')

        this.$wuxXnumber.init('num2', {
            callback: (value) => console.log(value), 
        })

        this.$wuxXnumber.init('num3', {
            className: 'custom-xnumber', 
        })

        this.$wuxXnumber.init('num4', {
            step: .5, 
        })

        this.$wuxXnumber.init('num5', {
            min: -5, 
            max: 8, 
            value: 1, 
        })

        this.$wuxXnumber.init('num6', {
            disabled: !1, 
        })

        this.$wuxXnumber.init('num7', {
            longpress: !0, 
        })
    },
})
```