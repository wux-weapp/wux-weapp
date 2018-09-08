# WhiteSpace 上下留白

布局控件。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "WhiteSpace",
    "usingComponents": {
        "wux-white-space": "../../dist/white-space/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">WhiteSpace</view>
        <view class="page__desc">上下留白</view>
    </view>
    <view class="page__bd">
        <wux-white-space size="small" />
        <view class="placeholder">Wux</view>
        <wux-white-space size="default" />
        <view class="placeholder">Wux</view>
        <wux-white-space size="large" />
        <view class="placeholder">Wux</view>
        <wux-white-space body-style="height: 20px" />
        <view class="placeholder">Wux</view>
    </view>
</view>
```

## 视频演示

[WhiteSpace](./_media/white-space.mp4 ':include :type=iframe width=375px height=667px')

## API

### WhiteSpace props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| size | <code>string</code> | 上下留白的间距，可选值为 small、default、large | default |
| body-style | <code>string</code> | 自定义样式 | - |

### WhiteSpace slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |