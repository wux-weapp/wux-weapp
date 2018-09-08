# Accordion 手风琴

可以折叠/展开的内容区域。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Accordion",
    "usingComponents": {
        "wux-accordion-group": "../../dist/accordion-group/index",
        "wux-accordion": "../../dist/accordion/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Accordion</view>
        <view class="page__desc">手风琴</view>
    </view>
    <view class="page__bd">
        <wux-accordion-group title="Default" default-current="{{ ['0', '1'] }}">
            <wux-accordion title="Accordion 1" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion title="Accordion 2" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion title="Accordion 3" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
        </wux-accordion-group>
        <wux-accordion-group title="Thumb">
            <wux-accordion thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="Accordion 1" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="Accordion 2" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="Accordion 3" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
        </wux-accordion-group>
        <wux-accordion-group title="Disabled">
            <wux-accordion disabled title="Accordion 1" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion disabled title="Accordion 2" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion disabled title="Accordion 3" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
        </wux-accordion-group>
        <wux-accordion-group title="Custom key" default-current="{{ ['key2'] }}">
            <wux-accordion key="key1" title="Accordion 1" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion key="key2" title="Accordion 2" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion key="key3" title="Accordion 3" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
        </wux-accordion-group>
        <wux-accordion-group title="Accordion = true" label="Accordion model" accordion default-current="{{ ['0'] }}">
            <wux-accordion title="Accordion 1">微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</wux-accordion>
            <wux-accordion title="Accordion 2">微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</wux-accordion>
            <wux-accordion title="Accordion 3">微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp</wux-accordion>
        </wux-accordion-group>
        <wux-accordion-group title="Auto = false" auto="{{ false }}" current="{{ current }}" bind:change="onChange">
            <wux-accordion title="Accordion 1" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion title="Accordion 2" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
            <wux-accordion title="Accordion 3" content="微信小程序自定义组件 https://github.com/wux-weapp/wux-weapp"></wux-accordion>
        </wux-accordion-group>
    </view>
</view>
```

```js
Page({
    data: {
        current: [],
    },
    onLoad() {
        this.key = String(Math.floor(Math.random() * 3))
    },
    onChange(e) {
        console.log(e)

        if (e.detail.key.indexOf(this.key) !== -1) {
            return wx.showModal({
                title: 'No switching is allowed',
                showCancel: !1,
            })
        }

        this.setData({
            current: e.detail.key,
        })
    },
})
```

## 视频演示

[Accordion](./_media/accordion.mp4 ':include :type=iframe width=375px height=667px')

## API

### AccordionGroup props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| defaultCurrent | <code>array</code> | 默认激活 tab 面板的 key，当 auto 为 true 时才生效 | - |
| current | <code>array</code> | 用于手动激活 tab 面板的 key，当 auto 为 false 时才生效 | - |
| auto | <code>boolean</code> | 是否自动控制激活 tab 面板 | true |
| accordion | <code>boolean</code> | 是否手风琴模式 | false |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |
| bind:change | <code>function</code> | 切换面板的回调函数 | - |

### Accordion props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | <code>string</code> | 当前激活 tab 索引 | - |
| thumb | <code>string</code> | 左侧缩略图 | - |
| title | <code>string</code> | 左侧标题 | - |
| content | <code>string</code> | 面板内容 | - |
| disabled | <code>boolean</code> | 是否禁用 | - |

### Accordion slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| header | 自定义左侧标题 |