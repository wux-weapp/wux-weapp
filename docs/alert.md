# Alert 警告框

用于展现警告信息，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Alert",
    "usingComponents": {
        "wux-white-space": "../../dist/white-space/index",
        "wux-icon": "../../dist/icon/index",
        "wux-alert": "../../dist/alert/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Alert</view>
        <view class="page__desc">警告框</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Theme</view>
        <wux-alert theme="light" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="stable" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="positive" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="calm" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="assertive" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="balanced" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="energized" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="royal" title="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert theme="dark" title="https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Closable</view>
        <wux-alert closable title="微信小程序自定义组件" label="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert closable title="微信小程序自定义组件" label="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert closable title="微信小程序自定义组件" label="https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Thumb</view>
        <wux-alert thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="https://github.com/wux-weapp/wux-weapp" />
        <wux-white-space />
        <wux-alert thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Slot</view>
        <wux-alert theme="balanced">
            <wux-icon wux-class="thumb" type="ios-checkmark-circle-outline" size="20" color="#fff" slot="header" />
            <text>微信小程序自定义组件</text>
            <wux-icon wux-class="close" type="ios-close-circle-outline" size="20" color="#fff" slot="footer" />
        </wux-alert>
        <wux-white-space />
        <wux-alert theme="energized">
            <wux-icon wux-class="thumb" type="ios-alert" size="20" color="#fff" slot="header" />
            <text>微信小程序自定义组件</text>
        </wux-alert>
        <wux-white-space />
        <wux-alert theme="assertive">
            <wux-icon wux-class="thumb" type="ios-close-circle-outline" size="20" color="#fff" slot="header" />
            <text>微信小程序自定义组件</text>
        </wux-alert>
    </view>
</view>
```

## 视频演示

[Alert](./_media/alert.mp4 ':include :type=iframe width=375px height=667px')

## API

### Alert props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| theme | <code>string</code> | 主题色，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| thumb | <code>string</code> | 缩略图 | - |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |
| closable | <code>boolean</code> | 是否显示关闭按钮 | false |
| bind:click | <code>function</code> | 点击关闭或者操作区域的回调函数 | - |

### Alert slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义标题或描述 |
| header | 自定义缩略图 |
| footer | 自定义右侧内容 |