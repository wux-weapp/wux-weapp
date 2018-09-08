# Icon 图标

Wux Weapp 的图标使用开源项目 [ionicons](https://ionicons.com/) 4.3.0 版本。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Icon",
    "usingComponents": {
        "wux-icon": "../../dist/icon/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Icon</view>
        <view class="page__desc">图标</view>
    </view>
    <view class="page__bd">
        <wux-icon type="ios-add" />
        <wux-icon type="md-add" />
        <wux-icon size="32" />
        <wux-icon size="64" />
        <wux-icon color="#33cd5f" />
        <wux-icon color="#387ef5" />
    </view>
</view>
```

## 视频演示

[Icon](./_media/icon.mp4 ':include :type=iframe width=375px height=667px')

## API

### Icon props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | <code>string</code> | 图标名称，可选值参考 [ionicons](https://ionicons.com/) 4.3.0 版本 | - |
| size | <code>number</code> | 图标大小 | 32 |
| color | <code>string</code> | 图标颜色 | - |