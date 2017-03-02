## loading(options)
指示器

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.text | <code>string</code> | 提示文本 |

**Example**  
```html
<import src="../../components/loading/loading.wxml"/>

<template is="loading" data="{{ ...$wux.loading }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Loading</view>
        <view class="page__desc">指示器</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="showLoading">加载中提示</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {},
    onLoad() {
        this.$wuxLoading = App.Wux().$wuxLoading
    },
    showLoading() {
        this.$wuxLoading.show({
            text: '数据加载中',
        })

        setTimeout(() => {
            this.$wuxLoading.hide()
        }, 1500)
    },
})
```