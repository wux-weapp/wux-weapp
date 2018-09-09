# Spin 加载中

用于页面和区块的加载中状态。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Spin",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
        "wux-spin": "../../dist/spin/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Spin</view>
        <view class="page__desc">加载中</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Default</view>
        <wux-spin wux-class="spin" />
        <view class="sub-title">Size</view>
        <wux-spin wux-class="spin" size="small" />
        <wux-spin wux-class="spin" size="default" />
        <wux-spin wux-class="spin" size="large" />
        <view class="sub-title">Nested</view>
        <wux-spin nested spinning="{{ spinning }}" tip="Loading...">
            <view>微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</view>
            <view>微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</view>
            <view>微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</view>
        </wux-spin>
        <wux-button block type="light" bind:click="onClick">Switch State</wux-button>
    </view>
</view>
```

```js
Page({
    onClick(e) {
        this.setData({
            spinning: !this.data.spinning,
        })
    },
})
```

## 视频演示

[Spin](./_media/spin.mp4 ':include :type=iframe width=375px height=667px')

## API

### Spin props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| tip | <code>string</code> | 自定义描述文案 | - |
| size | <code>string</code> | 组件大小，可选值为 small、default、large | default |
| spinning | <code>boolean</code> | 是否为加载中状态，仅当 nested 为 true 时生效 | true |
| nested | <code>boolean</code> | 是否作为包裹元素 | false |

### Spin slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |