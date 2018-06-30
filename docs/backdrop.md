# Backdrop 背景幕

在组件中设置显示蒙层。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Backdrop",
    "usingComponents": {
        "wux-backdrop": "../../dist/backdrop/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-backdrop` 或其他，之后在 page.js 中调用 `$wuxBackdrop(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-backdrop id="wux-backdrop" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Backdrop</view>
        <view class="page__desc">背景幕</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area btn-group">
            <button class="weui-btn" type="default" bindtap="retain">保持背景幕 retain</button>
            <button class="weui-btn" type="primary" bindtap="release">释放背景幕 release</button>
        </view>
        <view class="text-center">背景幕锁：{{ locks }}</view>
    </view>
</view>
```

```js
import { $wuxBackdrop } from '../../dist/index'

Page({
    data: {
        locks: 0,
    },
    onLoad() {
        this.$wuxBackdrop = $wuxBackdrop()
    },
    retain() {
        this.$wuxBackdrop.retain()
        this.setData({
            locks: this.$wuxBackdrop.backdropHolds
        })
    },
    release() {
        this.$wuxBackdrop.release()
        this.setData({
            locks: this.$wuxBackdrop.backdropHolds
        })
    }
})
```

## 视频演示

[Backdrop](./_media/backdrop.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| transparent | <code>boolean</code> | 是否显示透明蒙层 | false |