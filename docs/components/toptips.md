## toptips(options)
顶部提示

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.icon | <code>string</code> | 图标类型 |
| options.hidden | <code>boolean</code> | 是否隐藏图标 |
| options.text | <code>string</code> | 报错文本 |
| options.timer | <code>number</code> | 多少毫秒后消失 |
| options.className | <code>string</code> | 自定义类名 |
| options.success | <code>function</code> | 消失后的回调函数 |

**Example**  
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

        this.$wuxToptips = App.Wux().$wuxToptips
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

        this.$wuxToptips.success({
            hidden: !0, 
            text: '提交成功', 
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