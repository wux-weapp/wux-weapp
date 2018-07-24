# Toptips 顶部提示

用于展现简短的提示信息，在窗口顶部显示。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Toptips",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
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
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="showToptips1">Show</wux-button>
        <wux-button block type="light" bind:click="showToptips2">Success</wux-button>
        <wux-button block type="light" bind:click="showToptips3">Info</wux-button>
        <wux-button block type="light" bind:click="showToptips4">Warn</wux-button>
        <wux-button block type="light" bind:click="showToptips5">Error</wux-button>
        <wux-button block type="light" bind:click="showToptips6">Use return value to close</wux-button>
        <wux-button block type="light" bind:click="showToptips7">Use promise to know when closed</wux-button>
    </view>
</view>
```

```js
import { $wuxToptips } from '../../dist/index'

Page({
    showToptips1() {
        $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips2() {
        $wuxToptips().success({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips3() {
        $wuxToptips().info({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips4() {
        $wuxToptips().warn({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips5() {
        $wuxToptips().error({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips6() {
        if (this.timeout) clearTimeout(this.timeout)

        const hide = $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
        })

        this.timeout = setTimeout(hide, 1000)
    },
    showToptips7() {
        const hide = $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
        })

        // hide.promise.then(() => console.log('success'))
        hide.then(() => console.log('success'))
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
| options.success | <code>function</code> | 消失后的回调函数 | - |

### Toptips.method

- Toptips.show
- Toptips.success
- Toptips.info
- Toptips.warn
- Toptips.error

> 以上函数调用后，会返回一个引用，可以通过该引用手动关闭组件

```
const hide = Toptips.show()
hide()

// 返回值支持 promise 接口，可以通过 then/promise.then 方法在关闭后运行 callback
hide.then(callback)
hide.promise.then(callback)
```