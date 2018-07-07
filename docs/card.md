# Card 卡片

用于组织信息和操作，通常也作为详细信息的入口。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Card",
    "usingComponents": {
        "wux-card": "../../dist/card/index",
        "wux-wing-blank": "../../dist/wing-blank/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Card</view>
        <view class="page__desc">卡片</view>
    </view>
    <view class="page__bd">
        <view class="title">Default</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="title">Thumb</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容" thumb="{{ thumb }}">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="title">Custom thumb style</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容" thumb="{{ thumb }}" thumb-style="border-radius: 50%;">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="title">No border</view>
        <wux-wing-blank size="default">
            <wux-card bordered="{{ false }}" title="卡片标题" extra="额外内容" thumb="{{ thumb }}">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="title">Full</view>
        <wux-card full="{{ true }}" title="卡片标题" extra="额外内容" thumb="{{ thumb }}">
            <view slot="body">卡片内容</view>
            <view slot="footer">尾部内容</view>
        </wux-card>
    </view>
</view>
```

```js
Page({
    data: {
        thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
    },
})
```

## 视频演示

[Card](./_media/card.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| bordered | <code>boolean</code> | 是否有边框 | false |
| full | <code>boolean</code> | 是否通栏 | false |
| title | <code>string</code> | 卡片标题 | - |
| thumb | <code>string</code> | 卡片标题图片 | - |
| thumbStyle | <code>string</code> | 标题图片样式 | - |
| extra | <code>string</code> | 卡片标题辅助内容 | - |