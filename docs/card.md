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
        <view class="sub-title">Default</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="sub-title">Thumb</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="sub-title">Custom thumb style</view>
        <wux-wing-blank size="default">
            <wux-card title="卡片标题" extra="额外内容" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" thumb-style="border-radius: 50%;">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="sub-title">No border</view>
        <wux-wing-blank size="default">
            <wux-card bordered="{{ false }}" title="卡片标题" extra="额外内容" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png">
                <view slot="body">卡片内容</view>
                <view slot="footer">尾部内容</view>
            </wux-card>
        </wux-wing-blank>
        <view class="sub-title">Full</view>
        <wux-card full="{{ true }}" title="卡片标题" extra="额外内容" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png">
            <view slot="body">卡片内容</view>
            <view slot="footer">尾部内容</view>
        </wux-card>
    </view>
</view>
```

## 视频演示

[Card](./_media/card.mp4 ':include :type=iframe width=375px height=667px')

## API

### Card props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| bordered | <code>boolean</code> | 是否有边框 | false |
| full | <code>boolean</code> | 是否通栏 | false |
| title | <code>string</code> | 卡片标题 | - |
| thumb | <code>string</code> | 卡片标题图片 | - |
| thumbStyle | <code>string</code> | 标题图片样式 | - |
| extra | <code>string</code> | 卡片标题辅助内容 | - |

### Card slot

| 名称 | 描述 |
| --- | --- |
| body | 自定义内容 |
| footer | 自定义尾部内容 |