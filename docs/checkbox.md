# Checkbox 复选框

用于展现一组可选项多项选择，或者单独用于标记切换某种状态，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Checkbox",
    "usingComponents": {
        "wux-checkbox-group": "../../dist/checkbox-group/index",
        "wux-checkbox": "../../dist/checkbox/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Checkbox</view>
        <view class="page__desc">复选框</view>
    </view>
    <view class="page__bd">
        <form bindsubmit="formSubmit">
            <wux-checkbox-group name="a" value="{{ value1 }}" title="Default" bind:change="onChange1">
                <wux-checkbox color="light" title="Light" value="1" />
                <wux-checkbox color="stable" title="Stable" value="2" />
                <wux-checkbox color="positive" title="Positive" value="3" />
                <wux-checkbox color="calm" title="Calm" value="4" />
                <wux-checkbox color="balanced" title="Balanced" value="5" />
                <wux-checkbox color="energized" title="Energized" value="6" />
                <wux-checkbox color="assertive" title="Assertive" value="7" />
                <wux-checkbox color="royal" title="Royal" value="8" />
                <wux-checkbox color="dark" title="Dark" value="9" />
            </wux-checkbox-group>
            <wux-checkbox-group name="b" value="{{ value2 }}" title="Label" bind:change="onChange2">
                <wux-checkbox title="Java" label="details" value="1" />
                <wux-checkbox title="PHP" label="details" value="2" />
            </wux-checkbox-group>
            <wux-checkbox-group name="c" value="{{ value3 }}" title="Extra" bind:change="onChange3">
                <wux-checkbox title="Java" extra="extra" value="1" />
                <wux-checkbox title="PHP" extra="extra" value="2" />
            </wux-checkbox-group>
            <wux-checkbox-group name="d" value="{{ value4 }}" title="Trigger onChange" bind:change="onChange4">
                <wux-checkbox title="Java" value="1" />
                <wux-checkbox title="PHP" value="2" />
            </wux-checkbox-group>
            <wux-checkbox-group name="e" value="{{ ['1'] }}" title="Disabled">
                <wux-checkbox title="AV" value="1" disabled />
                <wux-checkbox title="PHP" value="2" disabled />
            </wux-checkbox-group>
            <view class="btn-area">
                <button formType="submit">Submit</button>
            </view>
        </form>
    </view>
</view>
```

```js
Page({
    data: {
        value1: ['1'],
        value2: ['1'],
        value3: ['1'],
        value4: ['1'],
    },
    onChange(field, e) {
        const { value } = e.detail
        const data = this.data[field]
        const index = data.indexOf(value)
        const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

        this.setData({
            [field]: current,
        })

        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    onChange1(e) {
        this.onChange('value1', e)
    },
    onChange2(e) {
        this.onChange('value2', e)
    },
    onChange3(e) {
        this.onChange('value3', e)
    },
    onChange4(e) {
        this.onChange('value4', e)
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
})
```

## 视频演示

[Checkbox](./_media/checkbox.mp4 ':include :type=iframe width=375px height=667px')

## API

### CheckboxGroup props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| name | <code>string</code> | 在表单中的字段名 | - |
| value | <code>array</code> | 在表单中的字段值（当前选中项的值） | [] |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |
| bind:change | <code>function</code> | change 事件触发的回调函数 | - |

### Checkbox props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | <code>string</code> | 左侧标题 | - |
| label | <code>string</code> | 标题下方的描述信息 | - |
| extra | <code>string</code> | 右侧内容 | - |
| value | <code>string</code> | 当前项的值 | - |
| checked | <code>boolean</code> | 是否默认选中 | false |
| disabled | <code>boolean</code> | 是否不可修改 | false |
| color | <code>string</code> | 主题色，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| bind:change | <code>function</code> | change 事件触发的回调函数，优先级低于父级 change 事件 | - |