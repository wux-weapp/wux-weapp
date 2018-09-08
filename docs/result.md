# Result 结果页

在整张页面中组织插画、图标、文字等内容，向用户反馈操作结果。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Result",
    "usingComponents": {
        "wux-result": "../../dist/result/index"
    }
}
```

### 示例

```html
<wux-result
    title="支付成功"
    label="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"
    buttons="{{ buttons }}"
    extra="Copyright © 2018 wux weapp"
    fixed
    bind:click="onClick"
/>
```

```js
Page({
    data: {
        buttons: [{
                type: 'balanced',
                block: true,
                text: '确定',
            },
            {
                type: 'light',
                block: true,
                text: '返回',
            },
        ],
    },
    onClick(e) {
        console.log(e)
        const { index } = e.detail

        index === 0 && wx.showModal({
            title: 'Thank you for your support!',
            showCancel: !1,
        })

        index === 1 && wx.navigateBack()
    },
})
```

## 视频演示

[Result](./_media/result.mp4 ':include :type=iframe width=375px height=667px')

## API

### Result props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| icon | <code>any</code> | 图标的配置项 | - |
| icon.type | <code>string</code> | 图标的类型，可选值为 success、success_no_circle、info、warn、waiting、cancel、download、search、clear | success |
| icon.size | <code>number</code> | 图标的大小 | 93 |
| icon.color | <code>string</code> | 图标的颜色 | #33cd5f |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |
| buttons | <code>array</code> | 按钮列表 | [] |
| extra | <code>string</code> | 底部内容 | - |
| fixed | <code>boolean</code> | 底部内容是否定位在底部 | false |
| bind:click | <code>function</code> | 点击事件 | - |
| bind:getuserinfo | <code>function</code> | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致 | - |
| bind:contact | <code>function</code> | 客服消息回调 | - |
| bind:getphonenumber | <code>function</code> | 获取用户手机号回调 | - |

> 按钮列表：buttons 参数请参考 [Button](button.md)。

### Result slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义标题或描述 |
| header | 自定义图标 |
| footer | 自定义底部内容 |