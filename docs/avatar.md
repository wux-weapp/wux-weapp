# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Avatar",
    "usingComponents": {
        "wux-avatar": "../../dist/avatar/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Avatar</view>
        <view class="page__desc">头像</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Default</view>
        <view>
            <wux-avatar size="small">U</wux-avatar>
            <wux-avatar>U</wux-avatar>
            <wux-avatar size="large">U</wux-avatar>
        </view>
        <view class="sub-title">Shape = square</view>
        <view>
            <wux-avatar shape="square" size="small">U</wux-avatar>
            <wux-avatar shape="square">U</wux-avatar>
            <wux-avatar shape="square" size="large">U</wux-avatar>
        </view>
        <view class="sub-title">Custom Style</view>
        <view>
            <wux-avatar wux-class="wux-avatar--custom" size="small">U</wux-avatar>
            <wux-avatar body-style="background-color: #11c1f3">U</wux-avatar>
            <wux-avatar body-style="background-color: #33cd5f" size="large">U</wux-avatar>
        </view>
        <view class="sub-title">Scale</view>
        <view>
            <wux-avatar scale size="small">Wux</wux-avatar>
            <wux-avatar scale>Weapp</wux-avatar>
            <wux-avatar scale size="large">Skyvow</wux-avatar>
        </view>
        <view class="sub-title">Src</view>
        <view>
            <wux-avatar size="small" src="http://pbqg2m54r.bkt.clouddn.com/logo.png" />
            <wux-avatar src="http://pbqg2m54r.bkt.clouddn.com/logo.png" />
            <wux-avatar size="large" src="http://pbqg2m54r.bkt.clouddn.com/logo.png" />
        </view>
    </view>
</view>
```

## 视频演示

[Avatar](./_media/avatar.mp4 ':include :type=iframe width=375px height=667px')

## API

### Avatar props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| shape | <code>string</code> | 指定头像的形状，可选值为 circle、square | circle |
| size | <code>string</code> | 设置头像的大小，可选值为 small、default、large | default |
| src | <code>string</code> | 图片类头像的资源地址 | - |
| bodyStyle | <code>string</code> | 自定义样式 | - |
| scale | <code>boolean</code> | 是否自动调整大小 | false |

### Avatar slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |