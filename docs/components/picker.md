## picker(id, options)
选择器

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.title | <code>string</code> | 提示标题 |
| options.cols | <code>array</code> | 选择器的数据 |
| options.cols[].className | <code>string</code> | 自定义每一列的类 |
| options.cols[].values | <code>array</code> | 自定义每一列的数据 |
| options.value | <code>array</code> | 选择器的默认值 |
| options.toolbar | <code>boolean</code> | 是否显示工具栏 |
| options.toolbarCloseText | <code>string</code> | 关闭按钮的文案 |
| options.onChange | <code>function</code> | 监听值变化的回调函数 |

**Example**  
```html
<import src="../../components/picker/picker.wxml"/>

<import src="../../components/picker-city/picker-city.wxml"/>

<template is="picker" data="{{ ...$wux.picker.phone }}"/>
<template is="picker" data="{{ ...$wux.picker.name }}"/>

<template is="picker-city" data="{{ ...$wux.pickerCity.city }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Picker</view>
        <view class="page__desc">选择器</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
            <button class="weui-btn" type="default" bindtap="onTapPhone">Default-Picker {{ phone }}</button>
            <button class="weui-btn" type="default" bindtap="onTapName">Multi-Picker {{ name }}</button>
            <button class="weui-btn" type="default" bindtap="onTapCity">City-Picker {{ city }}</button>
        </view>
    </view>
</view>
```

```js
import { $wuxPicker, $wuxPickerCity } from '../../components/wux'

Page({
    data: {},
    onLoad() {},
    onTapPhone() {
        $wuxPicker.init('phone', {
            title: "请选择您的手机", 
            cols: [
                {
                    textAlign: 'center',
                    values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus'],
                    // displayValues: [1, 2, 3, 4, 5, 6]
                }
            ],
            value: [5], 
            onChange(p) {
                console.log(p)
                this.setData({
                    phone: p.value
                })
            },
        })
    },
    onTapName() {
        $wuxPicker.init('name', {
            title: "请选择您的称呼", 
            cols: [
                {
                    textAlign: 'center',
                    values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
                },
                {
                    textAlign: 'center',
                    values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
                },
                {
                    textAlign: 'center',
                    values: ['先生', '小姐']
                }
            ],
            value: [3, 2, 1],
            onChange(p) {
                console.log(p)
                this.setData({
                    name: p.value
                })
            },
        })
    },
    onTapCity() {
        $wuxPickerCity.init('city', {
            title: '请选择目的地', 
            value: [8, 0, 11],
            onChange(p) {
                console.log(p)
                this.setData({
                    city: p.value
                })
            },
        })
    },
})
```