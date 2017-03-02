## rater(id, options)
评分组件

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.max | <code>number</code> | 最大值 |
| options.star | <code>string</code> | 图标 |
| options.value | <code>number</code> | 默认值 |
| options.activeColor | <code>string</code> | 图标激活的颜色 |
| options.margin | <code>number</code> | 图标外边距 |
| options.fontSize | <code>number</code> | 图标大小 |
| options.disabled | <code>boolean</code> | 禁用点击 |
| options.callback | <code>function</code> | 点击事件的回调函数 |

**Example**  
```html
<import src="../../components/rater/rater.wxml"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Rater</view>
        <view class="page__desc">评分组件</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">Normal Usage</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">set default score = 5</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.star }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">change color</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.changeColor }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">disabled = true</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Your history score</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.history }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Decimal score 3.7</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.decimal }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">custom font-size(15px)</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.custom }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom star</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Loving</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.loving }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Sunshine</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.sunshine }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Smilies</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.smilies }}"/>
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
        this.$wuxRater = App.Wux().$wuxRater
        this.$wuxRater.init('star', {
            value: 5, 
        })
        this.$wuxRater.init('changeColor', {
            value: 3, 
            activeColor: '#04BE02', 
        })

        this.$wuxRater.init('history', {
            value: 3, 
            disabled: !0, 
        })
        this.$wuxRater.init('decimal', {
            value: 3.7, 
            disabled: !0, 
        })
        this.$wuxRater.init('custom', {
            value: 3, 
            fontSize: 15, 
            disabled: !0, 
        })

        this.$wuxRater.init('loving', {
            value: 3, 
            star: '♡', 
        })
        this.$wuxRater.init('sunshine', {
            value: 3, 
            star: '☼', 
        })
        this.$wuxRater.init('smilies', {
            value: 3, 
            star: '☻', 
        })
    },
})
```