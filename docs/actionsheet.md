# ActionSheet 上拉菜单

从底部弹出的模态框，提供和当前场景相关的操作菜单。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "ActionSheet",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
        "wux-actionsheet": "../../dist/actionsheet/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-actionsheet` 或其他，之后在 page.js 中调用 `$wuxActionSheet(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-actionsheet id="wux-actionsheet" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">ActionSheet</view>
        <view class="page__desc">上拉菜单</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="showActionSheet1">原生 ActionSheet</wux-button>
        <wux-button block type="light" bind:click="showActionSheet2">iOS ActionSheet</wux-button>
        <wux-button block type="light" bind:click="showActionSheet3">wx ActionSheet</wux-button>
    </view>
</view>
```

```js
import { $wuxActionSheet } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showActionSheet1() {
        wx.showActionSheet({
            itemList: ['实例菜单', '实例菜单']
        })
    },
    showActionSheet2() {
        $wuxActionSheet().showSheet({
            titleText: '自定义操作',
            buttons: [{
                    text: 'Go Dialog'
                },
                {
                    text: 'Go Toast'
                },
            ],
            buttonClicked(index, item) {
                index === 0 && wx.navigateTo({
                    url: '/pages/dialog/index'
                })

                index === 1 && wx.navigateTo({
                    url: '/pages/toast/index'
                })

                return true
            },
            cancelText: '取消',
            cancel() {},
            destructiveText: '删除',
            destructiveButtonClicked() {},
        })
    },
    showActionSheet3() {
        if (this.timeout) clearTimeout(this.timeout)

        const hideSheet = $wuxActionSheet().showSheet({
            theme: 'wx',
            titleText: '三秒后自动关闭',
            buttons: [{
                    text: '实例菜单'
                },
                {
                    text: '实例菜单'
                },
            ],
            buttonClicked(index, item) {
                return true
            },
        })

        this.timeout = setTimeout(hideSheet, 3000)
    },
})
```

## 视频演示

[ActionSheet](./_media/actionsheet.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.theme | <code>string</code> | 菜单皮肤，可选值为 ios、wx | ios |
| options.className | <code>string</code> | 自定义类名 | - |
| options.titleText | <code>string</code> | 标题 | - |
| options.buttons | <code>array</code> | 按钮 | [] |
| options.buttons[].text | <code>string</code> | 按钮的文本 | - |
| options.buttonClicked | <code>function</code> | 按钮点击事件，返回值为 true 时将会关闭组件 | - |
| options.cancelText | <code>string</code> | 取消按钮的文本 | 取消 |
| options.cancel | <code>function</code> | 取消按钮或蒙层点击事件 | - |
| options.destructiveText | <code>string</code> | 删除按钮的文本 | - |
| options.destructiveButtonClicked | <code>function</code> | 删除按钮点击事件 | - |

### ActionSheet.method

- ActionSheet.showSheet
- ActionSheet.removeSheet
- ActionSheet.cancel

> ActionSheet.showSheet 函数调用后，会返回一个引用，可以通过该引用手动关闭组件

```
const hide = ActionSheet.showSheet()
hide()
```