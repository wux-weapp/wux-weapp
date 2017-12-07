## notification(options)
通知

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.image | <code>string</code> | 通知的图标 |
| options.title | <code>string</code> | 通知的标题 |
| options.text | <code>string</code> | 通知的文本 |
| options.timer | <code>number</code> | 多少毫秒后消失 |
| options.data | <code>undefined|null|boolean|number|string|object</code> | 自定义数据传给 onClick、onClose |
| options.onClick | <code>function</code> | 点击后的回调函数 |
| options.onClose | <code>function</code> | 消失后的回调函数 |

**Example**  
```html
<import src="../../components/notification/notification.wxml"/>

<template is="notification" data="{{ ...$wux.notification }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Notification</view>
        <view class="page__desc">通知</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="showNotification">Show Notification</button>
            <button class="weui-btn" type="default" bindtap="closeNotification">Close Notification</button>
        </view>
    </view>
</view>
```

```js
import { $wuxNotification } from '../../components/wux'

Page({
	data: {},
	onLoad() {},
	showNotification() {
		this.closeNotification = $wuxNotification.show({
			image: 'http://light7.org/assets/img/i-wechat.png', 
			title: '宝宝', 
			text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!', 
			data: {
				message: '逗你玩的!!!'
			}, 
			timer: 3000, 
			onClick(data) {
				console.log(data)
			},
			onClose(data) {
				console.log(data)
			},
		})
	},
})
```