# Button 按钮

按钮组件用于响应用户点击行为，触发相应的业务逻辑，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Button",
    "usingComponents": {
        "wux-icon": "../../dist/icon/index",
        "wux-button": "../../dist/button/index"
    }
}
```

### 示例

!> 目前，设置了 form-type 的 button 只会对当前组件中的 form 有效。因而，将 button 封装在自定义组件中，而 from 在自定义组件外，将会使这个 button 的 form-type 失效。

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Button</view>
        <view class="page__desc">按钮</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Type</view>
        <wux-button block type="light">light</wux-button>
        <wux-button block type="stable">stable</wux-button>
        <wux-button block type="positive">positive</wux-button>
        <wux-button block type="calm">calm</wux-button>
        <wux-button block type="assertive">assertive</wux-button>
        <wux-button block type="balanced">balanced</wux-button>
        <wux-button block type="energized">energized</wux-button>
        <wux-button block type="royal">royal</wux-button>
        <wux-button block type="dark">dark</wux-button>
        <view class="sub-title">Outline</view>
        <wux-button block outline type="light">light</wux-button>
        <wux-button block outline type="stable">stable</wux-button>
        <wux-button block outline type="positive">positive</wux-button>
        <wux-button block outline type="calm">calm</wux-button>
        <wux-button block outline type="assertive">assertive</wux-button>
        <wux-button block outline type="balanced">balanced</wux-button>
        <wux-button block outline type="energized">energized</wux-button>
        <wux-button block outline type="royal">royal</wux-button>
        <wux-button block outline type="dark">dark</wux-button>
        <view class="sub-title">Size</view>
        <wux-button block size="small" type="light">light</wux-button>
        <wux-button block size="small" type="stable">stable</wux-button>
        <wux-button block size="small" type="positive">positive</wux-button>
        <wux-button block size="default" type="calm">calm</wux-button>
        <wux-button block size="default" type="assertive">assertive</wux-button>
        <wux-button block size="default" type="balanced">balanced</wux-button>
        <wux-button block size="large" type="energized">energized</wux-button>
        <wux-button block size="large" type="royal">royal</wux-button>
        <wux-button block size="large" type="dark">dark</wux-button>
        <view class="sub-title">Clear</view>
        <wux-button block clear type="light">light</wux-button>
        <wux-button block clear type="stable">stable</wux-button>
        <wux-button block clear type="positive">positive</wux-button>
        <wux-button block clear type="calm">calm</wux-button>
        <wux-button block clear type="assertive">assertive</wux-button>
        <wux-button block clear type="balanced">balanced</wux-button>
        <wux-button block clear type="energized">energized</wux-button>
        <wux-button block clear type="royal">royal</wux-button>
        <wux-button block clear type="dark">dark</wux-button>
        <view class="sub-title">Loading</view>
        <wux-button block loading type="light">light</wux-button>
        <wux-button block loading type="stable">stable</wux-button>
        <wux-button block loading type="positive">positive</wux-button>
        <wux-button block loading type="calm">calm</wux-button>
        <wux-button block loading type="assertive">assertive</wux-button>
        <wux-button block loading type="balanced">balanced</wux-button>
        <wux-button block loading type="energized">energized</wux-button>
        <wux-button block loading type="royal">royal</wux-button>
        <wux-button block loading type="dark">dark</wux-button>
        <view class="sub-title">Disabled</view>
        <wux-button block disabled type="light">light</wux-button>
        <wux-button block disabled type="stable">stable</wux-button>
        <wux-button block disabled type="positive">positive</wux-button>
        <wux-button block disabled type="calm">calm</wux-button>
        <wux-button block disabled type="assertive">assertive</wux-button>
        <wux-button block disabled type="balanced">balanced</wux-button>
        <wux-button block disabled type="energized">energized</wux-button>
        <wux-button block disabled type="royal">royal</wux-button>
        <wux-button block disabled type="dark">dark</wux-button>
        <view class="sub-title">Icon</view>
        <wux-button block type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block outline type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block size="small" type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block size="default" type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block size="large" type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block clear type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
        <wux-button block disabled type="balanced"><wux-icon type="ios-save" size="16" /> balanced</wux-button>
    </view>
</view>
```

## 视频演示

[Button](./_media/button.mp4 ':include :type=iframe width=375px height=667px')

## API

### Button props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | <code>string</code> | 按钮类型，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | stable |
| clear | <code>boolean</code> | 是否清除样式 | false |
| block | <code>boolean</code> | 是否块级元素 | false |
| full | <code>boolean</code> | 是否通栏 | false |
| outline | <code>boolean</code> | 是否镂空 | false |
| size | <code>string</code> | 按钮的大小，可选值为 small、default、large | default |
| disabled | <code>boolean</code> | 是否禁用 | false |
| loading | <code>boolean</code> | 名称前是否带 loading 图标 | false |
| formType | <code>string</code> | 用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件 | - |
| openType | <code>string</code> | 微信开放能力，可选值为 contact、share、getUserInfo、getPhoneNumber | - |
| hoverStopPropagation | <code>boolean</code> | 指定是否阻止本节点的祖先节点出现点击态 | false |
| hoverStartTime | <code>number</code> | 按住后多久出现点击态，单位毫秒 | 20 |
| hoverStayTime | <code>number</code> | 手指松开后点击态保留时间，单位毫秒 | 70 |
| lang | <code>string</code> | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 | en |
| sessionFrom | <code>string</code> | 会话来源 | - |
| sendMessageTitle | <code>string</code> | 会话内消息卡片标题 | 当前标题 |
| sendMessagePath | <code>string</code> | 会话内消息卡片点击跳转小程序路径 | 当前分享路径 |
| sendMessageImg | <code>string</code> | 会话内消息卡片图片 | 截图 |
| showMessageCard | <code>boolean</code> | 显示会话内消息卡片 | false |
| bind:click | <code>function</code> | 点击事件 | - |
| bind:getuserinfo | <code>function</code> | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致 | - |
| bind:contact | <code>function</code> | 客服消息回调 | - |
| bind:getphonenumber | <code>function</code> | 获取用户手机号回调 | - |

### Button slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |