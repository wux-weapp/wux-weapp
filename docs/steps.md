# Steps 步骤条

显示一个任务的进度；或者引导用户完成某个复杂任务。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Steps",
    "usingComponents": {
        "wux-steps": "../../dist/steps/index",
        "wux-step": "../../dist/step/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Steps</view>
        <view class="page__desc">步骤条</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-steps>
            <wux-step status="finish" title="Finished" content="This is description"></wux-step>
            <wux-step status="process" title="In Progress" content="This is description"></wux-step>
            <wux-step status="wait" title="Waiting" content="This is description"></wux-step>
        </wux-steps>
        <view class="sub-title">Direction = vertical</view>
        <wux-steps direction="vertical">
            <wux-step status="finish" title="Finished" content="This is description"></wux-step>
            <wux-step status="process" title="In Progress" content="This is description"></wux-step>
            <wux-step status="error" title="Error" content="This is description"></wux-step>
        </wux-steps>
        <view class="sub-title">Current</view>
        <wux-steps current="{{ current }}">
            <wux-step title="First"></wux-step>
            <wux-step title="Second"></wux-step>
            <wux-step title="Third"></wux-step>
        </wux-steps>
        <view class="button-sp-area">
            <button type="default" bindtap="onClick">Next step</button>
        </view>
    </view>
</view>
```

```js
Page({
    data: {
        current: 1,
    },
    onClick() {
        const current = this.data.current + 1 > 2 ? 0 : this.data.current + 1

        this.setData({
            current,
        })
    },
})
```

## 视频演示

[Steps](./_media/steps.mp4 ':include :type=iframe width=375px height=667px')

## API

### Steps props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| current | <code>number</code> | 指定当前步骤，从 0 开始记数。在子 `Step` 元素中，可以通过 status 属性覆盖状态 | 0 |
| direction | <code>string</code> | step 样式，可选值为 vertical、horizontal | horizontal |

### Step props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| status | <code>string</code> | 指定状态，可选值为 wait、process、finish、error。当不配置该属性时，会使用 `Steps` 的 current 来自动指定状态 | - |
| title | <code>string</code> | 标题 | - |
| content | <code>string</code> | 步骤的详情描述 | - |
| icon | <code>string</code> | 步骤图标 | - |

### Step slot

| 名称 | 描述 |
| --- | --- |
| title | 自定义标题 |
| content | 自定义描述 |