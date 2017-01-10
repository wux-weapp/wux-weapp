# 微信小程序-自定义组件

## Components

- [Backdrop - 背景幕]

- [Dialog - 对话框]

- [Loading - 指示器]

- [Toast - 提示框]

- [Rater - 评分]

## Backdrop - 背景幕

```html
<import src="../../components/backdrop.wxml"/>

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
		this.$wuxBackdrop = App.wux(this).$wuxBackdrop
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

## Dialog - 对话框

```html
<import src="../../components/dialog.wxml"/>

<template is="dialog" data="{{ ...$wux.dialog }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Dialog</view>
        <view class="page__desc">对话框</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="openConfirm">Confirm Dialog</button>
            <button class="weui-btn" type="default" bindtap="openAlert">Alert Dialog</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {
		$wux: {
			aaa: 1
		}
	},
	onLoad() {
		this.$wuxDialog = App.wux(this).$wuxDialog
	},
	openConfirm() {
		const hideDialog = this.$wuxDialog.open({
			title: '弹窗标题',
			content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			confirm: () => console.log('confirm'),
			cancel: () => console.log('cancel'),
		})

		// setTimeout(hideDialog, 3000)
	},
	openAlert() {
		this.$wuxDialog.open({
			showCancel: !1,
			title: '弹窗标题',
			content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			confirm: () => console.log('confirm'),
		})
	}
})
```

## Loading - 指示器

```html
<import src="../../components/loading.wxml"/>

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
		this.$wuxLoading = App.wux(this).$wuxLoading
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

## Toast - 提示框

```html
<import src="../../components/toast.wxml"/>

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
		this.$wuxToast = App.wux(this).$wuxToast
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

## Rater - 评分

```html
<import src="../../components/rater.wxml"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Rater</view>
        <view class="page__desc">评分组件</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">Normal Usage</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">set default score = 5</view>
                <view class="weui-cell__ft">
                	<template is="rater" data="{{ name, ...$wux.rater.star }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">change color</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.changeColor }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">disabled = true</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Your history score</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.history }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Decimal score 3.7</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.decimal }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">custom font-size(15px)</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.custom }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom star</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Loving</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.loving }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Sunshine</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.sunshine }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Smilies</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ name, ...$wux.rater.smilies }}"/>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxRater = App.wux(this).$wuxRater
		this.$wuxRater.render('star', {
			value: 5, 
		})
		this.$wuxRater.render('changeColor', {
			value: 3, 
			activeColor: '#04BE02', 
		})


		this.$wuxRater.render('history', {
			value: 3, 
			disabled: !0, 
		})
		this.$wuxRater.render('decimal', {
			value: 3.7, 
			disabled: !0, 
		})
		this.$wuxRater.render('custom', {
			value: 3, 
			fontSize: 15, 
			disabled: !0, 
		})

		this.$wuxRater.render('loving', {
			value: 3, 
			star: '♡', 
		})
		this.$wuxRater.render('sunshine', {
			value: 3, 
			star: '☼', 
		})
		this.$wuxRater.render('smilies', {
			value: 3, 
			star: '☻', 
		})
	},
})
```

## 项目截图:

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-01.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-02.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-03.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-04.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-05.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-06.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-07.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-08.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-09.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-10.png" width="375px" style="display:inline;">

##	贡献

有任何意见或建议都欢迎提 issue

##	License

MIT