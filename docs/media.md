# Media 媒体对象

用于在一个内容块的左边或右边展示一个多媒体内容。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Media",
    "usingComponents": {
        "wux-media": "../../dist/media/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Media</view>
        <view class="page__desc">媒体对象</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-media title="标题一" label="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></wux-media>
        <view class="sub-title">Thumb</view>
        <wux-media thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="标题一" label="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></wux-media>
        <view class="sub-title">Custom thumb style</view>
        <wux-media thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" thumb-style="border-radius: 50%" title="标题一" label="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></wux-media>
        <view class="sub-title">Nesting</view>
        <wux-media align="flex-start" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="标题一" label="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。">
            <wux-media align="flex-start" thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="标题一" label="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"></wux-media>
        </wux-media>
    </view>
</view>
```

## 视频演示

[Media](./_media/media.mp4 ':include :type=iframe width=375px height=667px')

## API

### Media props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | <code>string</code> | 标题 | - |
| thumb | <code>string</code> | 标题图片 | - |
| thumbStyle | <code>string</code> | 标题图片样式 | - |
| label | <code>string</code> | 标题辅助内容 | - |
| align | <code>string</code> | 对齐方式，可选值为 start、center、end、baseline、stretch | center |

### Media slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |