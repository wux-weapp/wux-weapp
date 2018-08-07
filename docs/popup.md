# Popup 弹出框

用于显示弹出框。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Popup",
    "usingComponents": {
        "wux-cell-group": "../../dist/cell-group/index",
        "wux-cell": "../../dist/cell/index",
        "wux-button": "../../dist/button/index",
        "wux-popup": "../../dist/popup/index"
    }
}
```

### 示例

```html
<wux-popup closable visible="{{ visible1 }}" title="Delete" content="Are you sure???" bind:change="onChange1" bind:close="onClose1" bind:closed="onClosed1">
    <view slot="footer" class="popup__button" bindtap="close1">OK</view>
</wux-popup>

<wux-popup position="bottom" class-names="slideInUp" visible="{{ visible2 }}" bind:close="onClose2">
    <wux-cell-group title="Your fathers">
        <wux-cell hover-class="none" title="Jack Ma"></wux-cell>
        <wux-cell hover-class="none" title="Pony"></wux-cell>
        <wux-cell hover-class="none">
            <wux-button block type="balanced" bindtap="close2">Yes</wux-button>
        </wux-cell>
    </wux-cell-group>
</wux-popup>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Popup</view>
        <view class="page__desc">弹出框</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <wux-button block type="light" bind:click="open1">Default</wux-button>
        <wux-button block type="light" bind:click="open2">Popup</wux-button>
    </view>
</view>
```

```js
Page({
    data: {
        visible1: false,
        visible2: false,
    },
    open1() {
        this.setData({
            visible1: true,
        })
    },
    open2() {
        this.setData({
            visible2: true,
        })
    },
    close1() {
        this.setData({
            visible1: false,
        })
    },
    close2() {
        this.setData({
            visible2: false,
        })
    },
    onClose(key) {
        console.log('onClose')
        this.setData({
            [key]: false,
        })
    },
    onClose1() {
        this.onClose('visible1')
    },
    onClose2() {
        this.onClose('visible2')
    },
    onClosed1() {
        console.log('onClosed')
    },
    onChange1(e) {
        console.log('onChange', e.detail.visible)
    },
})
```

## 视频演示

[Popup](./_media/popup.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | <code>string</code> | 标题 | - |
| content | <code>string</code> | 内容 | - |
| extra | <code>string</code> | 底部内容 | - |
| position | <code>string</code> | 弹出层位置信息，可选值为 center、bottom | center |
| wrapStyle | <code>string</code> | 自定义 wrap 样式 | - |
| closable | <code>boolean</code> | 是否显示关闭按钮 | false |
| mask | <code>boolean</code> | 是否显示蒙层 | true |
| maskClosable | <code>boolean</code> | 点击蒙层是否允许关闭 | true |
| visible | <code>boolean</code> | 是否可见 | false |
| classNames | <code>string</code> | 过渡的类名 | fadeIn |
| bind:change | <code>function</code> | 显示隐藏的回调函数 | - |
| bind:close | <code>function</code> | 点击关闭按钮或蒙层的回调函数 | - |
| bind:closed | <code>function</code> | 关闭后的回调函数 | - |