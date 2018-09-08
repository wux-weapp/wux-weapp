# WingBlank 两翼留白

布局控件。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "WingBlank",
    "usingComponents": {
        "wux-wing-blank": "../../dist/wing-blank/index",
        "wux-white-space": "../../dist/white-space/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">WingBlank</view>
        <view class="page__desc">两翼留白</view>
    </view>
    <view class="page__bd">
        <wux-wing-blank size="small">
            <view class="placeholder">Wux</view>
        </wux-wing-blank>
        <wux-white-space />
        <wux-wing-blank size="default">
            <view class="placeholder">Wux</view>
        </wux-wing-blank>
        <wux-white-space />
        <wux-wing-blank size="large">
            <view class="placeholder">Wux</view>
        </wux-wing-blank>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left: 20px; margin-right: 20px">
            <view class="placeholder">Wux</view>
        </wux-wing-blank>
    </view>
</view>
```

## 视频演示

[WingBlank](./_media/wing-blank.mp4 ':include :type=iframe width=375px height=667px')

## API

### WingBlank props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| size | <code>string</code> | 两翼留白的间距，可选值为 small、default、large | default |
| body-style | <code>string</code> | 自定义样式 | - |

### WingBlank slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |