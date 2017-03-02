## toast(options)
提示框

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.type | <code>string</code> | 提示类型 |
| options.timer | <code>number</code> | 提示延迟时间 |
| options.color | <code>string</code> | 图标颜色 |
| options.text | <code>string</code> | 提示文本 |
| options.success | <code>function</code> | 关闭后的回调函数 |

**Example**  
```html
<import src="../../components/toast/toast.wxml"/>

<template is="toast" data="{{ ...$wux.toast }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Toast</view>
        <view class="page__desc">提示框</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="showToast">成功提示</button>
            <button class="weui-btn" type="default" bindtap="showToastCancel">取消提示</button>
            <button class="weui-btn" type="default" bindtap="showToastErr">禁止提示</button>
            <button class="weui-btn" type="default" bindtap="showToastText">文本提示</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {},
    onLoad() {
        this.$wuxToast = App.Wux().$wuxToast
    },
    showToast() {
        this.$wuxToast.show({
            type: 'success',
            timer: 1500,
            color: '#fff',
            text: '已完成',
            success: () => console.log('已完成')
        })
    },
    showToastCancel() {
        this.$wuxToast.show({
            type: 'cancel',
            timer: 1500,
            color: '#fff',
            text: '取消操作',
            success: () => console.log('取消操作')
        })
    },
    showToastErr() {
        this.$wuxToast.show({
            type: 'forbidden',
            timer: 1500,
            color: '#fff',
            text: '禁止操作',
            success: () => console.log('禁止操作')
        })
    },
    showToastText() {
        this.$wuxToast.show({
            type: 'text',
            timer: 1500,
            color: '#fff',
            text: '文本提示',
            success: () => console.log('文本提示')
        })
    },
})
```