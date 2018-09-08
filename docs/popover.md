# Popover 气泡框

弹出气泡式的卡片浮层。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Popover",
    "usingComponents": {
        "wux-popover": "../../dist/popover/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Popover</view>
        <view class="page__desc">气泡框</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Placement</view>
        <view class="button-sp-area">
            <wux-popover placement="topLeft" title="Title" content="Content">
                <button size="mini">topLeft</button>
            </wux-popover>
        </view>
        <view class="button-sp-area">
            <wux-popover placement="top" title="Title" content="Content">
                <button size="mini">top</button>
            </wux-popover>
        </view>
        <view class="button-sp-area">
            <wux-popover placement="topRight" title="Title" content="Content">
                <button size="mini">topRight</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-left">
            <wux-popover placement="rightTop" title="Title" content="Content">
                <button size="mini">rightTop</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-left">
            <wux-popover placement="right" title="Title" content="Content">
                <button size="mini">right</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-left">
            <wux-popover placement="rightBottom" title="Title" content="Content">
                <button size="mini">rightBottom</button>
            </wux-popover>
        </view>
        <view class="button-sp-area">
            <wux-popover placement="bottomRight" title="Title" content="Content">
                <button size="mini">bottomRight</button>
            </wux-popover>
        </view>
        <view class="button-sp-area">
            <wux-popover placement="bottom" title="Title" content="Content">
                <button size="mini">bottom</button>
            </wux-popover>
        </view>
        <view class="button-sp-area">
            <wux-popover placement="bottomLeft" title="Title" content="Content">
                <button size="mini">bottomLeft</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-right">
            <wux-popover placement="leftBottom" title="Title" content="Content">
                <button size="mini">leftBottom</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-right">
            <wux-popover placement="left" title="Title" content="Content">
                <button size="mini">left</button>
            </wux-popover>
        </view>
        <view class="button-sp-area text-right">
            <wux-popover placement="leftTop" title="Title" content="Content">
                <button size="mini">leftTop</button>
            </wux-popover>
        </view>
        <view class="sub-title">Default Visible</view>
        <view class="button-sp-area text-left">
            <wux-popover default-visible="{{ true }}" placement="rightBottom" title="Title" content="Content">
                <button size="mini">rightBottom</button>
            </wux-popover>
        </view>
        <view class="sub-title">Custom style</view>
        <view class="button-sp-area">
            <wux-popover placement="top" title="Title" content="Content" body-style="width: 300px;">
                <button size="mini">top</button>
            </wux-popover>
        </view>
        <view class="sub-title">Theme = dark</view>
        <view class="button-sp-area">
            <wux-popover theme="dark" placement="top" title="Title" content="Content">
                <button size="mini">top</button>
            </wux-popover>
        </view>
        <view class="sub-title">Slot</view>
        <view class="button-sp-area">
            <wux-popover placement="top">
                <button size="mini">top</button>
                <view slot="title" style="color: red;">Title</view>
                <view slot="content">Content</view>
            </wux-popover>
        </view>
        <view class="sub-title">Auto = false</view>
        <view class="button-sp-area">
            <wux-popover visible="{{ visible }}" auto="{{ false }}" placement="top" title="Title" bind:change="onChange">
                <view slot="content" bindtap="hide">Close</view>
                <button size="mini">top</button>
            </wux-popover>
        </view>
    </view>
</view>
```

```js
Page({
    data: {
        visible: false,
    },
    hide() {
        this.setData({
            visible: false,
        })
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            visible: e.detail.visible,
        })
    },
})
```

## 视频演示

[Popover](./_media/popover.mp4 ':include :type=iframe width=375px height=667px')

## API

### Popover props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| theme | <code>string</code> | 气泡框主题，可选值为 light、dark | light |
| title | <code>string</code> | 提示标题 | - |
| content | <code>string</code> | 提示内容 | - |
| bodyStyle | <code>string</code> | 自定义样式 | - |
| defaultVisible | <code>boolean</code> | 默认是否显隐，当 auto 为 true 时才生效 | false |
| placement | <code>string</code> | 气泡框位置，可选值为 top、left、right、bottom、topLeft、topRight、bottomLeft、bottomRight、leftTop、leftBottom、rightTop、rightBottom | top |
| trigger | <code>string</code> | 触发行为，可选值为 click | click |
| visible | <code>boolean</code> | 用于手动控制浮层显隐，当 auto 为 false 时才生效 | false |
| auto | <code>boolean</code> | 是否自动控制浮层显隐 | true |
| bind:change | <code>function</code> | 显示隐藏的回调函数 | - |

### Popover slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| title | 自定义提示标题 |
| content | 自定义提示内容 |