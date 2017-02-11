# 微信小程序-自定义组件

## Components

* [Backdrop - 背景幕](#backdrop)

* [CountUp - 计数器](#countup)

* [Dialog - 对话框](#dialog)

* [Gallery - 画廊](#gallery)

* [Loading - 指示器](#loading)

* [Picker - 城市选择器](#picker)

* [Qrcode - 二维码](#qrcode)

* [Rater - 评分](#rater)

* [Toast - 提示框](#toast)

* [Toptips - 顶部提示](#toptips)

* [Xnumber - 计数器](#xnumber)

## Backdrop

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

## CountUp

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">CountUp</view>
        <view class="page__desc">计数器</view>
    </view>
    <view class="page__bd">
        <view class="text-center">
        	<view class="countup">{{ $wux.countUp.c1.value }}</view>
        	<view class="countup">{{ $wux.countUp.c2.value }}</view>
        	<view class="countup">{{ $wux.countUp.c3.value }}</view>
        </view>
        <view class="weui-btn-area text-center">
            <button class="weui-btn" type="primary" size="mini" bindtap="start">Start</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="pauseResume">Pause/Resume</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="reset">Reset</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="update">Update</button>
        </view>
    </view>
</view>

```

```js
const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxCountUp = App.wux(this).$wuxCountUp

		this.c1 = this.$wuxCountUp.render('c1', 1, 1024)
		this.c2 = this.$wuxCountUp.render('c2', 0, 88.88, 2)
		this.c3 = this.$wuxCountUp.render('c3', 0, 520)
		
		this.c1.start()
		this.c2.start()
	},
	start() {
		this.c3.start(() => {
			wx.showToast({
				title: '已完成', 
			})
		})
	},
	reset() {
		this.c3.reset()
	},
	update() {
		this.c3.update(1314)
	},
	pauseResume() {
		this.c3.pauseResume()
	},
})
```

## Dialog

```html
<import src="../../components/dialog/dialog.wxml"/>

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
	data: {},
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

## Gallery

```html
<import src="../../components/gallery/gallery.wxml"/>

<template is="gallery" data="{{ ...$wux.gallery }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Gallery</view>
        <view class="page__desc">画廊</view>
    </view>
    <view class="page__bd">
    	<view class="weui-cells__title">基于小程序原生的wx.previewImage</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <view class="weui-uploader">
                        <view class="weui-uploader__bd">
                            <view class="weui-uploader__files">
                                <block wx:for-items="{{ urls }}" wx:key="{{ index }}">
                                    <view class="weui-uploader__file" bindtap="previewImage" data-current="{{ item }}">
                                        <image class="weui-uploader__img" src="{{ item }}" />
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">自定义gallery</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <view class="weui-uploader">
                        <view class="weui-uploader__bd">
                            <view class="weui-uploader__files">
                                <block wx:for-items="{{ urls }}" wx:key="{{ index }}">
                                    <view class="weui-uploader__file" bindtap="showGallery" data-current="{{ index }}">
                                        <image class="weui-uploader__img" src="{{ item }}" />
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {
		urls: [
			'https://unsplash.it/200/200', 
			'https://unsplash.it/300/300', 
			'https://unsplash.it/400/400', 
			'https://unsplash.it/600/600', 
			'https://unsplash.it/800/800', 
			'https://unsplash.it/900/900', 
			'https://unsplash.it/1000/1000', 
			'https://unsplash.it/1200/1200', 
		],
	},
	onLoad() {
		this.$wuxGallery = App.wux(this).$wuxGallery
	},
	showGallery(e) {
		const that = this
		const dataset = e.currentTarget.dataset
		const current = dataset.current
		const urls = this.data.urls

		this.$wuxGallery.show({
			current: current, 
			urls: urls, 
			delete: (current, urls) => {
				urls.splice(current, 1)
				that.setData({
					urls: urls, 
				})
				return !0
			},
			callback: () => console.log('Close gallery')
		})
	},
	previewImage(e) {
		const dataset = e.currentTarget.dataset
		const current = dataset.current
		const urls = this.data.urls

		wx.previewImage({
			current: current, 
			urls: urls, 
		})
	},
})
```

## Loading

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

## Picker

```html
<import src="../../components/picker/picker.wxml"/>

<template is="picker" data="{{ ...$wux.picker.default }}"/>
<template is="picker" data="{{ ...$wux.picker.multi }}"/>
<template is="picker" data="{{ ...$wux.pickerCity.city }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Picker</view>
        <view class="page__desc">选择器</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="onTapDefault">Default-Picker {{ default }}</button>
            <button class="weui-btn" type="default" bindtap="onTapMulti">Multi-Picker {{ multi }}</button>
            <button class="weui-btn" type="default" bindtap="onTapCity">City-Picker {{ city }}</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxPicker = App.wux(this).$wuxPicker
		this.$wuxPickerCity = App.wux(this).$wuxPickerCity
	},
	onTapDefault() {
		const that = this
		that.$wuxPicker.render('default', {
			items: ['飞机票', '火车票', '的士票', '住宿费', '礼品费', '活动费', '通讯费', '补助', '其他'],
		    bindChange(value, values) {
				console.log(value, values)
				that.setData({
					default: values
				})
			},
		})
	},
	onTapMulti() {
		const that = this
		that.$wuxPicker.render('multi', {
			items: [
				['1', '2', '3'],
				['A', 'B', 'C'],
			],
			value: [0, 1],
			bindChange(value, values) {
				console.log(value, values)
				that.setData({
					multi: values
				})
			},
		})
	},
	onTapCity() {
		const that = this
		that.$wuxPickerCity.render('city', {
			title: '请选择目的地', 
			value: [8, 0, 11],
		    bindChange(value, values, displayValues) {
				console.log(value, values, displayValues)
				that.setData({
					city: displayValues
				})
			},
		})
	},
})
```

## Qrcode

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Qrcode</view>
        <view class="page__desc">二维码</view>
    </view>
    <view class="page__bd">
    	<view class="weui-cells__title">请输入文字，即时输入即时生成</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <textarea value="{{ value }}" bindinput="bindinput" class="weui-textarea" placeholder="支持文本、网址和电子邮箱" style="height: 4.2em" maxlength="300" />
                    <view class="weui-textarea-counter">{{ value.length }}/300</view>
                </view>
            </view>
        </view>
        <view class="weui-cells__tips">提示：Canvas在微信中无法长按识别</view>
        <canvas style="width: 200px; height: 200px; margin: 30px auto;" canvas-id="qrcode"></canvas>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {
		value: '', 
	},
	onLoad() {
		this.$wuxQrcode = App.wux(this).$wuxQrcode

		this.$wuxQrcode.init('qrcode', 'wux')
	},
	bindinput(e) {
		const value = e.detail.value

		this.setData({
			value, 
		})

		this.$wuxQrcode.init('qrcode', value)
	},
})
```

## Rater

```html
<import src="../../components/rater/rater.wxml"/>

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
                	<template is="rater" data="{{ ...$wux.rater.star }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">change color</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.changeColor }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">disabled = true</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Your history score</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.history }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Decimal score 3.7</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.decimal }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">custom font-size(15px)</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.custom }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom star</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Loving</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.loving }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Sunshine</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.sunshine }}"/>
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Smilies</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.smilies }}"/>
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

## Toast

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

## Toptips

```html
<import src="../../components/toptips/toptips.wxml"/>

<template is="toptips" data="{{ ...$wux.toptips }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Toptips</view>
        <view class="page__desc">顶部提示</view>
    </view>
    <view class="page__bd">
        <form bindsubmit="submitForm">
        	<view class="weui-cells__title">性别</view>
		    <view class="weui-cells weui-cells_after-title">
		        <radio-group name="gender" bindchange="radioChange">
		            <label class="weui-cell weui-check__label" wx:for="{{ radio }}" wx:key="{{ item.value }}">
		                <radio class="weui-check" value="{{ item.value }}" checked="{{ item.checked }}"/>
		                <view class="weui-cell__bd">{{ item.name }}</view>
		                <view class="weui-cell__ft weui-cell__ft_in-radio" wx:if="{{ item.checked }}">
		                    <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
		                </view>
		            </label>
		        </radio-group>
		    </view>
		    <view class="weui-cells__title">编码助手(1-2个)</view>
	        <view class="weui-cells weui-cells_after-title">
	            <checkbox-group name="assistance" bindchange="checkboxChange">
	                <label class="weui-cell weui-check__label" wx:for="{{ checkbox }}" wx:key="">
	                    <checkbox class="weui-check" value="{{ item.value }}" checked="{{ item.checked }}"/>
	                    <view class="weui-cell__hd weui-check__hd_in-checkbox">
	                        <icon class="weui-icon-checkbox_circle" type="circle" size="23" wx:if="{{ !item.checked }}"></icon>
	                        <icon class="weui-icon-checkbox_success" type="success" size="23" wx:if="{{ item.checked }}"></icon>
	                    </view>
	                    <view class="weui-cell__bd">{{ item.name }}</view>
	                </label>
	            </checkbox-group>
	        </view>
		    <view class="weui-cells">
		        <view class="weui-cell weui-cell_input">
		            <view class="weui-cell__hd">
		                <view class="weui-label">手机号</view>
		            </view>
		            <view class="weui-cell__bd">
		                <input name="tel" value="{{ form.tel }}" class="weui-input" type="number" placeholder="请输入手机号" />
		            </view>
		        </view>
		        <view class="weui-cell weui-cell_input">
		            <view class="weui-cell__hd">
		                <view class="weui-label">身份证号码</view>
		            </view>
		            <view class="weui-cell__bd">
		                <input name="idcard" value="{{ form.idcard }}" class="weui-input" type="idcard" placeholder="请输入身份证号码" />
		            </view>
		        </view>
		    </view>
		    <view class="button-sp-area">
		        <button class="weui-btn" type="primary" formType="submit">提交</button>
		    </view>
		</form>
    </view>
</view>
```

```js
const App = getApp()

Page({
	data: {
    	form: {
			gender    : '', 
			assistance: '', 
			tel       : '', 
			idcard    : '', 
        },
        radio: [
            {
            	name: '男', 
            	value: 'male', 
            	checked: !1, 
            },
            {
            	name: '女', 
            	value: 'female', 
            },
        ],
        checkbox: [
            {
            	name: '黄药师', 
            	value: '0001', 
            	checked: !1, 
            },
            {
            	name: '欧阳锋', 
            	value: '0002', 
            },
            {
            	name: '段智兴', 
            	value: '0003', 
            },
            {
            	name: '洪七公', 
            	value: '0004', 
            },
        ],
    },
	onLoad() {
		this.initValidate()

		this.$wuxToptips = App.wux(this).$wuxToptips
	},
	showToptips(error) {
		const hideToptips = this.$wuxToptips.show({
			timer: 3000,
			text: error.msg || '请填写正确的字段',
			success: () => console.log('toptips', error)
		})

		// setTimeout(hideToptips, 1500)
	},
	submitForm(e) {
		const params = e.detail.value

		console.log(params)

		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			this.showToptips(error)
			return false
		}

		this.$wuxToptips.show({
			text: '提交成功', 
			className: 'bg-success', 
		})
	},
	initValidate() {
    	this.WxValidate = App.WxValidate({
			gender: {
				required: true, 
			},
			assistance: {
				required: true, 
				assistance: true, 
			},
			tel: {
				required: true, 
				tel: true, 
			},
			idcard: {
				required: true, 
				idcard: true, 
			},
		}, {
			gender: {
				required: '请选择性别', 
			},
			assistance: {
				required: '请勾选1-2个敲码助手', 
			},
			tel: {
				required: '请输入手机号', 
				tel: '请输入正确的手机号', 
			},
			idcard: {
				required: '请输入身份证号码', 
				idcard: '请输入正确的身份证号码', 
			},
		})

		this.WxValidate.addMethod('assistance', (value, param) => {
			return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
		}, '请勾选1-2个敲码助手')
    },
	radioChange(e) {		 
		const value = e.detail.value
		const radio = this.data.radio
		radio.forEach(n => n.checked = n.value === value)
		this.setData({
			radio: radio, 
			'form.gender': value, 
		})
	},
	checkboxChange(e) {
        const values = e.detail.value
        const checkbox = this.data.checkbox

        for (let i = 0, lenI = checkbox.length; i < lenI; ++i) {
            checkbox[i].checked = !1
            for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkbox[i].value == values[j]){
                    checkbox[i].checked = !0
                    break
                }
            }
        }

        this.setData({
            checkbox: checkbox, 
            'form.assistance': values, 
        })
    },
})
```

## Xnumber

```html
<import src="../../components/xnumber/xnumber.wxml"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Xnumber</view>
        <view class="page__desc">计数器</view>
    </view>
    <view class="page__bd">
    	<view class="weui-cells__title">默认</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num1 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置 callback 回调函数，在调试窗口中输出</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num2 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置宽度为100px</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num3 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置步长为0.5</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num4 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置值为1，最小值为-5，最大值为8</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num5 }}"/>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置可输入</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                	<template is="xnumber" data="{{ ...$wux.xnumber.num6 }}"/>
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
		this.$wuxXnumber = App.wux(this).$wuxXnumber

		this.$wuxXnumber.render('num1')

		this.$wuxXnumber.render('num2', {
			callback: (value) => console.log(value), 
		})

		this.$wuxXnumber.render('num3', {
			className: 'custom-xnumber', 
		})

		this.$wuxXnumber.render('num4', {
			step: .5, 
		})

		this.$wuxXnumber.render('num5', {
			min: -5, 
			max: 8, 
			value: 1, 
		})

		this.$wuxXnumber.render('num6', {
			disabled: !1, 
		})
	},
})
```

## 项目截图

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-01.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-02.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-16.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-03.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-04.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-05.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-06.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-07.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-08.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-09.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-10.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-11-1.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-11-2.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-11-3.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-12.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-13.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-14.png" width="375px" style="display:inline;">

<img src="https://github.com/skyvow/wux/blob/master/assets/images/screenshots/screenshorts-15.png" width="375px" style="display:inline;">

## 贡献

有任何意见或建议都欢迎提 issue

## License

MIT