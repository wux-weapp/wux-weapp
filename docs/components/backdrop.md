## backdrop()
背景幕

**Example**  
```html
<import src="../../components/backdrop/backdrop.wxml"/>

<template is="backdrop" data="{{ ...$wux.backdrop }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Backdrop</view>
        <view class="page__desc">背景幕</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area ezpop">
            <button class="weui-btn" type="default" bindtap="retain">保持背景幕 retain</button>
            <button class="weui-btn" type="primary" bindtap="release">释放背景幕 release</button>
        </view>
        <view class="text-center">背景幕锁：{{ locks }}</view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {
        locks: 0, 
    },
    onLoad() {
        this.$wuxBackdrop = App.Wux().$wuxBackdrop.init()
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