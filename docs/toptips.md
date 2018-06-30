# Toptips 顶部提示

用于展现简短的提示信息，在窗口顶部显示。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Toptips",
    "usingComponents": {
        "wux-toptips": "../../dist/toptips/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-toptips` 或其他，之后在 page.js 中调用 `$wuxToptips(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-toptips id="wux-toptips" />

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
import { $wuxToptips } from '../../dist/index'
import WxValidate from '../../assets/plugins/WxValidate'

Page({
    data: {
        form: {
            gender: '',
            assistance: '',
            tel: '',
            idcard: '',
        },
        radio: [{
                name: '男',
                value: 'male',
                checked: !1,
            },
            {
                name: '女',
                value: 'female',
            },
        ],
        checkbox: [{
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
    },
    showToptips(error) {
        const hideToptips = $wuxToptips().show({
            duration: 3000,
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

        $wuxToptips().success({
            hidden: !0,
            text: '提交成功',
        })
    },
    initValidate() {
        this.WxValidate = new WxValidate({
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
                if (checkbox[i].value == values[j]) {
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

## 视频演示

[Toptips](./_media/toptips.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.icon | <code>string</code> | 图标类型 | cancel |
| options.hidden | <code>boolean</code> | 是否隐藏图标 | false |
| options.text | <code>string</code> | 报错文本 | - |
| options.duration | <code>number</code> | 多少毫秒后消失 | 3000 |
| options.className | <code>string</code> | 自定义类名 | - |
| options.success | <code>function</code> | 消失后的回调函数 | - |