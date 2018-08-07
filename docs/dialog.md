# Dialog 对话框

模态对话框，在浮层中显示，引导用户进行相关操作。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Dialog",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
        "wux-dialog": "../../dist/dialog/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-dialog` 或其他，之后在 page.js 中调用 `$wuxDialog(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-dialog id="wux-dialog" />
<wux-dialog id="wux-dialog--alert" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Dialog</view>
        <view class="page__desc">对话框</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="open">Default Dialog</wux-button>
        <wux-button block type="light" bind:click="confirm">Confirm Dialog</wux-button>
        <wux-button block type="light" bind:click="alert">Alert Dialog</wux-button>
        <wux-button block type="light" bind:click="prompt">Prompt Dialog</wux-button>
        <wux-button block type="light" bind:click="custom">Custom Dialog</wux-button>
        <wux-button block type="light" bind:click="vertical">Vertical Buttons Dialog</wux-button>
    </view>
</view>
```

```js
import { $wuxDialog } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    open() {
        if (this.timeout) clearTimeout(this.timeout)

        const hideDialog = $wuxDialog().open({
            resetOnClose: true,
            title: '三秒后自动关闭',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            buttons: [{
                    text: '取消',
                },
                {
                    text: '确定',
                    type: 'primary',
                    onTap(e) {
                        console.log(e)
                    },
                },
            ],
        })

        this.timeout = setTimeout(hideDialog, 3000)
    },
    confirm() {
        $wuxDialog().confirm({
            resetOnClose: true,
            closable: true,
            title: '定制冰激凌',
            content: '你确定要吃我的冰淇淋吗？',
            onConfirm(e) {
                console.log('凭什么吃我的冰淇淋！')
            },
            onCancel(e) {
                console.log('谢谢你不吃之恩！')
            },
        })
    },
    alert() {
        $wuxDialog().alert({
            resetOnClose: true,
            title: '不要吃果冻',
            content: '它们可能是用旧的皮鞋帮做的！',
            onConfirm(e) {
                console.log('感谢上帝，你没吃鞋帮！')
            },
        })
    },
    prompt() {
        const alert = (content) => {
            $wuxDialog('#wux-dialog--alert').alert({
                resetOnClose: true,
                title: '提示',
                content: content,
            })
        }

        $wuxDialog().prompt({
            resetOnClose: true,
            title: '提示',
            content: '密码为8位数字',
            fieldtype: 'number',
            password: !0,
            defaultText: '',
            placeholder: '请输入Wi-Fi密码',
            maxlength: 8,
            onConfirm(e, response) {
                const content = response.length === 8 ? `Wi-Fi密码到手了: ${response}` : `请输入正确的Wi-Fi密码`
                alert(content)
            },
        })
    },
    custom() {
        const alert = (content) => {
            $wuxDialog('#wux-dialog--alert').alert({
                resetOnClose: true,
                title: '提示',
                content: content,
            })
        }

        $wuxDialog().open({
            resetOnClose: true,
            title: '我是标题',
            content: '我是自定义的对话框！',
            buttons: [{
                    text: '现金支付',
                    type: 'primary',
                    onTap(e) {
                        alert('你选择了现金支付！')
                    },
                },
                {
                    text: '微信支付',
                    type: 'primary',
                    onTap(e) {
                        alert('你选择了微信支付！')
                    },
                },
                {
                    text: '取消',
                },
            ],
        })
    },
    vertical() {
        $wuxDialog().open({
            resetOnClose: true,
            title: '请问需要反馈什么问题？',
            content: '你也可以在个人页的反馈帮助中心里找到这个功能',
            verticalButtons: !0,
            buttons: [{
                    text: '遇到问题',
                    bold: !0,
                },
                {
                    text: '意见建议',
                    bold: !0,
                },
                {
                    text: '没啥事',
                    bold: !0,
                },
            ],
        })
    },
})
```

## 视频演示

[Dialog](./_media/dialog.mp4 ':include :type=iframe width=375px height=667px')

## API

### Dialog.open

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.title | <code>string</code> | 提示标题 | - |
| options.content | <code>string</code> | 提示文本 | - |
| options.verticalButtons | <code>boolean</code> | 是否显示垂直按钮布局 | false |
| options.resetOnClose | <code>boolean</code> | 组件关闭时重置其内部数据 | false |
| options.closable | <code>boolean</code> | 是否显示关闭按钮 | false |
| options.mask | <code>boolean</code> | 是否显示蒙层 | true |
| options.maskClosable | <code>boolean</code> | 点击蒙层是否允许关闭 | true |
| options.buttons | <code>array</code> | 按钮 | [] |
| options.buttons[].text | <code>string</code> | 按钮的文本 | - |
| options.buttons[].type | <code>string</code> | 按钮的类型，可选值为 default、primary | - |
| options.buttons[].bold | <code>boolean</code> | 是否加粗按钮的文字 | - |
| options.buttons[].onTap | <code>function</code> | 按钮的点击事件 | - |

### Dialog.alert

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.title | <code>string</code> | 提示标题 | - |
| options.content | <code>string</code> | 提示文本 | - |
| options.confirmText | <code>string</code> | 确定按钮的文字 | 确定 |
| options.confirmType | <code>string</code> | 确定按钮的类型 | primary |
| options.onConfirm | <code>function</code> | 确定按钮的点击事件 | - |

### Dialog.confirm

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.title | <code>string</code> | 提示标题 | - |
| options.content | <code>string</code> | 提示文本 | - |
| options.confirmText | <code>string</code> | 确定按钮的文字 | 确定 |
| options.confirmType | <code>string</code> | 确定按钮的类型 | primary |
| options.onConfirm | <code>function</code> | 确定按钮的点击事件 | - |
| options.cancelText | <code>string</code> | 取消按钮的文字 | 取消 |
| options.cancelType | <code>string</code> | 取消按钮的类型 | default |
| options.onCancel | <code>function</code> | 取消按钮的点击事件 | - |

### Dialog.prompt

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.title | <code>string</code> | 提示标题 | - |
| options.content | <code>string</code> | 提示文本 | - |
| options.fieldtype | <code>string</code> | input 的类型，可选值为 text、number、idcard、digit | text |
| options.password | <code>boolean</code> | 是否是密码类型 | false |
| options.defaultText | <code>string</code> | 默认值 | - |
| options.placeholder | <code>string</code> | 输入框为空时占位符 | - |
| options.maxlength | <code>number</code> | 最大输入长度，设置为 -1 的时候不限制最大长度 | -1 |
| options.confirmText | <code>string</code> | 确定按钮的文字 | 确定 |
| options.confirmType | <code>string</code> | 确定按钮的类型 | primary |
| options.onConfirm | <code>function</code> | 确定按钮的点击事件 | - |
| options.cancelText | <code>string</code> | 取消按钮的文字 | 取消 |
| options.cancelType | <code>string</code> | 取消按钮的类型 | default |
| options.onCancel | <code>function</code> | 取消按钮的点击事件 | - |

> 以上函数调用后，会返回一个引用，可以通过该引用手动关闭对话框

```
const hideDialog = Dialog.open()
hideDialog()
```