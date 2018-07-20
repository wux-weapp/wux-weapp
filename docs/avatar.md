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
    <view class="page__bd">
        <view>
            <wux-avatar size="small">U</wux-avatar>
            <wux-avatar>U</wux-avatar>
            <wux-avatar size="large">U</wux-avatar>
        </view>
        <view>
            <wux-avatar shape="square" size="small">U</wux-avatar>
            <wux-avatar shape="square">U</wux-avatar>
            <wux-avatar shape="square" size="large">U</wux-avatar>
        </view>
        <view>
            <wux-avatar wux-class="wux-avatar--custom">U</wux-avatar>
            <wux-avatar body-style="background-color: #87d068">U</wux-avatar>
            <wux-avatar scale>Wux</wux-avatar>
            <wux-avatar scale>Weapp</wux-avatar>
            <wux-avatar src="http://pbqg2m54r.bkt.clouddn.com/logo.png" />
        </view>
    </view>
</view>
```

## 视频演示

[Avatar](./_media/avatar.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| shape | <code>string</code> | 指定头像的形状，可选值为 circle、square | circle |
| size | <code>string</code> | 设置头像的大小，可选值为 small、default、large | default |
| src | <code>string</code> | 图片类头像的资源地址 | - |
| bodyStyle | <code>string</code> | 自定义样式 | - |
| scale | <code>boolean</code> | 是否自动调整大小 | false |