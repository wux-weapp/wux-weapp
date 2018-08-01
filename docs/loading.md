# Loading 指示器

用于展现 loading 提示框。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Loading",
    "usingComponents": {
        "wux-button": "../../dist/button/index",
        "wux-loading": "../../dist/loading/index"
    }
}
```

### 示例

!> 该组件主要依靠 JavaScript 主动调用，所以一般只需在 wxml 中添加一个组件，并设置 id 为 `#wux-loading` 或其他，之后在 page.js 中调用 `$wuxLoading(id)` 获取匹配到的第一个组件实例对象。

```html
<wux-loading id="wux-loading" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Loading</view>
        <view class="page__desc">指示器</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="showLoading">加载中提示</wux-button>
    </view>
</view>
```

```js
import { $wuxLoading } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showLoading() {
        this.$wuxLoading = $wuxLoading()
        this.$wuxLoading.show({
            text: '数据加载中',
        })

        setTimeout(() => {
            this.$wuxLoading.hide()
        }, 1500)
    },
})
```

## 视频演示

[Loading](./_media/loading.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.text | <code>string</code> | 提示文本 | 数据加载中 |

### Loading.method

- Loading.show
- Loading.hide