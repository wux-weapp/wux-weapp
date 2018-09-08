# SearchBar 搜索栏

用于展现搜索栏，提醒用户输入相关内容进行搜索。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "SearchBar",
    "usingComponents": {
        "wux-search-bar": "../../dist/search-bar/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">SearchBar</view>
        <view class="page__desc">搜索栏</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Normal</view>
        <wux-search-bar maxlength="8" />
        <view class="sub-title">Focus</view>
        <wux-search-bar focus />
        <view class="sub-title">Show cancel button</view>
        <wux-search-bar show-cancel value="{{ value }}" auto="{{ false }}" placeholder="Search" bind:change="onChange" bind:focus="onFocus" bind:blur="onBlur" bind:confirm="onConfirm" bind:clear="onClear" bind:cancel="onCancel" />
    </view>
</view>
```

```js
Page({
    data: {
        value: '',
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            value: e.detail.value,
        })
    },
    onFocus(e) {
        console.log('onFocus', e)
    },
    onBlur(e) {
        console.log('onBlur', e)
    },
    onConfirm(e) {
        console.log('onConfirm', e)
    },
    onClear(e) {
        console.log('onClear', e)
        this.setData({
            value: '',
        })
    },
    onCancel(e) {
        console.log('onCancel', e)
    },
})
```

## 视频演示

[SearchBar](./_media/search-bar.mp4 ':include :type=iframe width=375px height=667px')

## API

### SearchBar props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | <code>string</code> | 输入框的默认值，当 auto 为 true 时才生效 | - |
| value | <code>string</code> | 输入框的当前值，当 auto 为 false 时才生效 | - |
| auto | <code>boolean</code> | 是否组件内部控制当前值 | true |
| placeholder | <code>string</code> | 输入框为空时占位符 | 搜索 |
| maxlength | <code>number</code> | 最大输入长度，设置为 -1 的时候不限制最大长度 | 140 |
| focus | <code>boolean</code> | 获取焦点 | false |
| disabled | <code>boolean</code> | 是否禁用 | false |
| cancelText | <code>string</code> | 自定义取消按钮的文字 | 取消 |
| showCancel | <code>boolean</code> | 是否一直显示取消按钮 | false |
| bind:change | <code>function</code> | 键盘输入时触发 | - |
| bind:focus | <code>function</code> | 输入框聚焦时触发 | - |
| bind:blur | <code>function</code> | 输入框失去焦点时触发 | - |
| bind:confirm | <code>function</code> | 点击完成按钮时触发 | - |
| bind:clear | <code>function</code> | 点击清除图标时触发 | - |
| bind:cancel | <code>function</code> | 点击取消按钮时触发 | - |