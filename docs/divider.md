# Divider 分割线

用于区隔内容的分割线。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Divider",
    "usingComponents": {
        "wux-divider": "../../dist/divider/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Divider</view>
        <view class="page__desc">分割线</view>
    </view>
    <view class="page__bd">
        <wux-divider show-text="{{ false }}" />
        <wux-divider show-text="{{ false }}" dashed />
        <wux-divider position="left" text="Wux Weapp" />
        <wux-divider text="Wux Weapp" />
        <wux-divider position="right" text="Wux Weapp" />
        <wux-divider dashed position="left" text="Wux Weapp" />
        <wux-divider dashed text="Wux Weapp" />
        <wux-divider dashed position="right" text="Wux Weapp" />
        <wux-divider>
            <view class="loadmore">
                <view class="loading"></view>
                <text class="text">正在加载</text>
            </view>
        </wux-divider>
    </view>
</view>
```

## 视频演示

[Divider](./_media/divider.mp4 ':include :type=iframe width=375px height=667px')

## API

### Divider props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| position | <code>string</code> | 分割线文字的位置，可选值为 left、center、right | center |
| dashed | <code>boolean</code> | 是否显示虚线 | false |
| text | <code>string</code> | 文字 | - |
| showText | <code>boolean</code> | 是否显示文字 | true |

### Divider slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |