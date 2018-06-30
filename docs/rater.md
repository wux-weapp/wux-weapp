# Rater 评分组件

对评价进行展示或对事物进行快速的评级操作。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Rater",
    "usingComponents": {
        "wux-rater": "../../dist/rater/index"
    }
}
```

### 示例

```html
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
                    <wux-rater value="{{ 5 }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">change color</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" active-color="#04BE02" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">disabled = true</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Your history score</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" disabled="{{ true }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Decimal score 3.7</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3.7 }}" disabled="{{ true }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">custom font-size(15px)</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" font-size="{{ 15 }}" disabled="{{ true }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom star</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Loving</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" margin="{{ 15 }}" star="♡" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Sunshine</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" margin="{{ 15 }}" star="☼" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Smilies</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" margin="{{ 15 }}" star="☻" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom text</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Star</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ value }}" bind:change="onChange" />
                    <text class="wux-rater__text">{{ value }} stars</text>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">set callback</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">How embarrass</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ 3 }}" star="囧" bind:change="onChange" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">update value</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Very good</view>
                <view class="weui-cell__ft">
                    <wux-rater value="{{ slider }}" star="屌" bind:change="sliderChange" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <slider value="{{ slider }}" show-value min="0" max="5" bindchange="sliderChange" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">repeat</view>
        <view class="weui-cells weui-cells_after-title">
            <block wx:for="{{ items }}" wx:key="">
                <view class="weui-cell">
                    <view class="weui-cell__bd">{{ item.text }}</view>
                    <view class="weui-cell__ft">
                        <wux-rater value="{{ item.value }}" />
                    </view>
                </view>
            </block>
        </view>
    </view>
</view>
```

```js
Page({
    data: {
        items: [{
                id: '001',
                text: 'Face',
                value: 1,
            },
            {
                id: '002',
                text: 'Eye',
                value: 2,
            },
        ],
        slider: 0,
    },
    sliderChange(e) {
        this.setData({
            slider: e.detail.value,
        })
    },
    bindchange(e) {
        console.log(e)
    },
})
```

## 视频演示

[Rater](./_media/rater.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| max | <code>number</code> | 最大值 | 5 |
| star | <code>string</code> | 图标 | ★ |
| value | <code>number</code> | 默认值 | 0 |
| activeColor | <code>string</code> | 图标激活的颜色 | #fc6 |
| margin | <code>number</code> | 图标外边距 | 2 |
| fontSize | <code>number</code> | 图标大小 | 25 |
| disabled | <code>boolean</code> | 禁用点击 | false |
| bind:change | <code>function</code> | 点击事件的回调函数 | - |