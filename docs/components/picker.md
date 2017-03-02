## picker(id, options)
选择器

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.title | <code>string</code> | 提示标题 |
| options.items | <code>array</code> | 选择器的数据 |
| options.cancel | <code>object</code> | 取消按钮的配置项 |
| options.cancel.text | <code>string</code> | 取消按钮的文字 |
| options.cancel.className | <code>string</code> | 添加自定义取消按钮的类 |
| options.cancel.bindtap | <code>function</code> | 点击取消按钮的回调函数 |
| options.confirm | <code>object</code> | 确定按钮的配置项 |
| options.confirm.text | <code>string</code> | 确定按钮的文字 |
| options.confirm.className | <code>string</code> | 添加自定义确定按钮的类 |
| options.confirm.bindtap | <code>function</code> | 点击确定按钮的回调函数 |
| options.onChange | <code>function</code> | 监听值变化的回调函数 |

**Example**  
```html
<import src="../../components/picker/picker.wxml"/>

<import src="../../components/picker-city/picker-city.wxml"/>

<template is="picker" data="{{ ...$wux.picker.default }}"/>
<template is="picker" data="{{ ...$wux.picker.multi }}"/>

<template is="picker-city" data="{{ ...$wux.pickerCity.city }}"/>

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
        this.$wuxPicker = App.Wux().$wuxPicker
        this.$wuxPickerCity = App.Wux().$wuxPickerCity
    },
    onTapDefault() {
        const that = this
        that.$wuxPicker.init('default', {
            items: ['飞机票', '火车票', '的士票', '住宿费', '礼品费', '活动费', '通讯费', '补助', '其他'],
            onChange(value, values) {
                console.log(value, values)
                that.setData({
                    default: values
                })
            },
        })
    },
    onTapMulti() {
        const that = this
        that.$wuxPicker.init('multi', {
            items: [
                ['1', '2', '3'],
                ['A', 'B', 'C'],
            ],
            value: [0, 1],
            onChange(value, values) {
                console.log(value, values)
                that.setData({
                    multi: values
                })
            },
        })
    },
    onTapCity() {
        const that = this
        that.$wuxPickerCity.init('city', {
            title: '请选择目的地', 
            value: [8, 0, 11],
            onChange(value, values, displayValues) {
                console.log(value, values, displayValues)
                that.setData({
                    city: displayValues
                })
            },
        })
    },
})
```