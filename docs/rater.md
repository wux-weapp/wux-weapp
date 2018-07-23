# Rater 评分组件

对评价进行展示或对事物进行快速的评级操作。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Rater",
    "usingComponents": {
        "wux-cell-group": "../../dist/cell-group/index",
        "wux-cell": "../../dist/cell/index",
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
        <wux-cell-group title="Normal Usage">
            <wux-cell title="Set default score = 5" hover-class="none">
                <wux-rater slot="footer" value="{{ 5 }}" />
            </wux-cell>
            <wux-cell title="Change color" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" active-color="#33cd5f" />
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Disabled = true">
            <wux-cell title="Your history score" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" disabled />
            </wux-cell>
            <wux-cell title="Decimal score 3.7" hover-class="none">
                <wux-rater slot="footer" value="{{ 3.7 }}" disabled />
            </wux-cell>
            <wux-cell title="Custom font-size(15px)" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" font-size="{{ 15 }}" disabled />
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Custom star">
            <wux-cell title="Loving" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" margin="{{ 15 }}" star="♡" />
            </wux-cell>
            <wux-cell title="Sunshine" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" margin="{{ 15 }}" star="☼" />
            </wux-cell>
            <wux-cell title="Smilies" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" margin="{{ 15 }}" star="☻" />
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Custom text">
            <wux-cell title="Star" hover-class="none">
                <view slot="footer">
                    <wux-rater value="{{ value }}" bind:change="onChange" />
                    <text class="wux-rater__text">{{ value }} stars</text>
                </view>
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Set callback">
            <wux-cell title="How embarrass" hover-class="none">
                <wux-rater slot="footer" value="{{ 3 }}" star="囧" bind:change="onChange" />
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Update value">
            <wux-cell title="Very good" hover-class="none">
                <wux-rater slot="footer" value="{{ slider }}" star="屌" bind:change="sliderChange" />
            </wux-cell>
            <wux-cell hover-class="none">
                <slider value="{{ slider }}" show-value min="0" max="5" bindchange="sliderChange" />
            </wux-cell>
        </wux-cell-group>
        <wux-cell-group title="Set callback">
            <block wx:for="{{ items }}" wx:key="">
                <wux-cell title="{{ item.text }}" hover-class="none">
                    <wux-rater slot="footer" value="{{ item.value }}" />
                </wux-cell>
            </block>
        </wux-cell-group>
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
| activeColor | <code>string</code> | 图标激活的颜色 | #ffc900 |
| margin | <code>number</code> | 图标外边距 | 2 |
| fontSize | <code>number</code> | 图标大小 | 25 |
| disabled | <code>boolean</code> | 禁用点击 | false |
| bind:change | <code>function</code> | 点击事件的回调函数 | - |