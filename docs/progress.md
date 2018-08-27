# Progress 进度条

用于展现某个任务的当前进度，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Progress",
    "usingComponents": {
        "wux-white-space": "../../dist/white-space/index",
        "wux-button": "../../dist/button/index",
        "wux-progress": "../../dist/progress/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Progress</view>
        <view class="page__desc">进度条</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Theme</view>
        <wux-progress active-color="light" percent="50" />
        <wux-white-space />
        <wux-progress active-color="stable" percent="50" />
        <wux-white-space />
        <wux-progress active-color="positive" percent="50" />
        <wux-white-space />
        <wux-progress active-color="calm" percent="50" />
        <wux-white-space />
        <wux-progress active-color="assertive" percent="50" />
        <wux-white-space />
        <wux-progress active-color="balanced" percent="50" />
        <wux-white-space />
        <wux-progress active-color="royal" percent="50" />
        <wux-white-space />
        <wux-progress active-color="energized" percent="50" />
        <wux-white-space />
        <wux-progress active-color="dark" percent="50" />
        <view class="sub-title">BackgroundColor</view>
        <wux-progress background-color="#fff" percent="25" />
        <wux-white-space />
        <wux-progress background-color="#f3f3f3" percent="50" />
        <wux-white-space />
        <wux-progress background-color="#f8f8f8" percent="75" />
        <view class="sub-title">Shape</view>
        <wux-progress shape="square" percent="25" />
        <wux-white-space />
        <wux-progress shape="square" percent="50" />
        <wux-white-space />
        <wux-progress shape="square" percent="75" />
        <view class="sub-title">BarStyle</view>
        <wux-progress bar-style="background-color: #5cb85c" percent="25" />
        <wux-white-space />
        <wux-progress bar-style="background-color: #5bc0de" percent="50" />
        <wux-white-space />
        <wux-progress bar-style="background-color: #f0ad4e" percent="75" />
        <view class="sub-title">StrokeWidth</view>
        <wux-progress stroke-width="8" percent="25" />
        <wux-white-space />
        <wux-progress stroke-width="10" percent="50" />
        <wux-white-space />
        <wux-progress stroke-width="12" percent="75" />
        <view class="sub-title">ShowInfo</view>
        <wux-progress show-info percent="{{ percent }}" />
        <wux-progress show-info percent="{{ percent }}" />
        <wux-progress show-info percent="{{ percent }}" />
        <wux-button block type="light" bind:click="add">Add</wux-button>
    </view>
</view>
```

```js
Page({
    data: {
        percent: 50,
    },
    add() {
        let percent = this.data.percent + 10

        if (this.data.percent >= 100) {
            percent = 0
        }

        this.setData({
            percent,
        })
    },
})
```

## 视频演示

[Progress](./_media/progress.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| percent | <code>number</code> | 百分比 0~100 | - |
| strokeWidth | <code>string</code> | 进度条线的宽度，单位 px | - |
| activeColor | <code>string</code> | 已选择的进度条的颜色，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| backgroundColor | <code>string</code> | 未选择的进度条的颜色 | - |
| barStyle | <code>string</code> | 进度样式 | - |
| shape | <code>string</code> | 形状，可选值为 circle、square | circle |
| showInfo | <code>boolean</code> | 在进度条右侧显示百分比 | false |