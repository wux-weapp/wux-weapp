# NoticeBar 通告栏

在导航栏下方，一般用作系统提醒、活动提醒等通知。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "NoticeBar",
    "usingComponents": {
        "wux-notice-bar": "../../dist/notice-bar/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">NoticeBar</view>
        <view class="page__desc">通告栏</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-notice-bar content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Loop = true</view>
        <wux-notice-bar loop>
            微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp
        </wux-notice-bar>
        <view class="sub-title">Speed = 100</view>
        <wux-notice-bar loop speed="100" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Leading = 3000</view>
        <wux-notice-bar loop leading="3000" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Trailing = 1500</view>
        <wux-notice-bar loop trailing="1500" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">No Icon</view>
        <wux-notice-bar icon="" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Mode = closable</view>
        <wux-notice-bar mode="closable" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
        <view class="sub-title">Mode = link</view>
        <wux-notice-bar mode="link" action="" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" bind:click="onClick">
            <text slot="footer" style="color: #a1a1a1; margin-left: 10px;">去看看</text>
        </wux-notice-bar>
        <view class="sub-title">Custom Style</view>
        <wux-notice-bar wux-class="notice-bar" icon="http://pbqg2m54r.bkt.clouddn.com/logo.png" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp" />
    </view>
</view>
```

```js
Page({
    onClick() {
        wx.showModal({
            title: 'Thank you for your support!',
            showCancel: !1,
        })
    },
})
```

## 视频演示

[NoticeBar](./_media/notice-bar.mp4 ':include :type=iframe width=375px height=667px')

## API

### NoticeBar props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| mode | <code>string</code> | 提示类型，可选值为 closable、link | - |
| content | <code>string</code> | 滚动的文字 | - |
| icon | <code>string</code> | 左侧提示图标 | - |
| action | <code>string</code> | 右侧关闭图标，当 mode 为 closable、link 时才生效 | - |
| loop | <code>boolean</code> | 文字是否滚动显示 | false |
| leading | <code>number</code> | 进入第一次滚动所需等待的时间 | 500 |
| trailing | <code>number</code> | 进入下一次滚动所需等待的时间 | 800 |
| speed | <code>number</code> | 滚动显示的速度 | 25 |
| bind:click | <code>function</code> | 点击关闭或者操作区域的回调函数 | - |

### NoticeBar slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| header | 自定义左侧内容 |
| footer | 自定义右侧内容 |