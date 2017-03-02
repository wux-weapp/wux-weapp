## actionsheet(options)
上拉菜单

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.className | <code>string</code> | 自定义类名 |
| options.titleText | <code>string</code> | 标题 |
| options.buttons | <code>array</code> | 按钮 |
| options.buttons[].text | <code>string</code> | 按钮的文本 |
| options.buttonClicked | <code>function</code> | 按钮点击事件 |
| options.cancelText | <code>string</code> | 取消按钮的文本 |
| options.cancel | <code>function</code> | 取消按钮点击事件 |
| options.destructiveText | <code>string</code> | 删除按钮的文本 |
| options.destructiveButtonClicked | <code>function</code> | 删除按钮点击事件 |

**Example**  
```html
<import src="../../components/actionsheet/actionsheet.wxml"/>

<template is="actionsheet" data="{{ ...$wux.actionSheet }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">ActionSheet</view>
        <view class="page__desc">上拉菜单</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="showActionSheet1">原生 ActionSheet</button>
            <button class="weui-btn" type="default" bindtap="showActionSheet2">自定义 ActionSheet</button>
            <button class="weui-btn" type="default" bindtap="showActionSheet3">自定义 ActionSheet</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {},
    onLoad() {
        this.$wuxActionSheet = App.Wux().$wuxActionSheet
    },
    showActionSheet1() {
        wx.showActionSheet({
            itemList: ['实例菜单', '实例菜单']
        })
    },
    showActionSheet2() {
        this.$wuxActionSheet.show({
            titleText: '自定义操作',
            buttons: [
                { 
                    text: 'Go Dialog' 
                },
                { 
                    text: 'Go Toast' 
                },
            ],
            buttonClicked(index, item) {
                index === 0 && wx.navigateTo({
                    url: '/pages/dialog/index'
                })

                index === 1 && wx.navigateTo({
                    url: '/pages/toast/index'
                })
                
                return true
            },
            cancelText: '取消',
            cancel() {},
            destructiveText: '删除',
            destructiveButtonClicked() {},
        })
    },
    showActionSheet3() {
        if (this.timeout) clearTimeout(this.timeout)

        const hideSheet = this.$wuxActionSheet.show({
            titleText: '三秒后自动关闭',
            buttons: [
                { 
                    text: '实例菜单' 
                },
                { 
                    text: '实例菜单' 
                },
            ],
            buttonClicked(index, item) {
                return true
            },
        })

        this.timeout = setTimeout(hideSheet, 3000)
    },
})
```