# Swicth 滑动开关

用于展现两个互斥对象的选择。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Swicth",
    "usingComponents": {
        "wux-cell-group": "../../dist/cell-group/index",
        "wux-cell": "../../dist/cell/index",
        "wux-switch": "../../dist/switch/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Swicth</view>
        <view class="page__desc">滑动开关</view>
    </view>
    <view class="page__bd">
        <form bindsubmit="formSubmit">
            <wux-cell-group title="Form switch">
                <wux-cell title="On">
                    <wux-switch name="a" slot="footer" value="{{ value1 }}" bind:change="onChange1" />
                </wux-cell>
                <wux-cell title="Off">
                    <wux-switch name="b" slot="footer" value="{{ value2 }}" bind:change="onChange2" />
                </wux-cell>
                <wux-cell title="Custom color">
                    <wux-switch name="c" slot="footer" value="{{ value3 }}" color="red" bind:change="onChange3" />
                </wux-cell>
                <wux-cell title="Custom color">
                    <wux-switch name="d" slot="footer" value="{{ value4 }}" color="yellow" bind:change="onChange4" />
                </wux-cell>
                <wux-cell title="Disabled on">
                    <wux-switch name="e" slot="footer" value="{{ true }}" disabled />
                </wux-cell>
                <wux-cell title="Disabled off">
                    <wux-switch name="f" slot="footer" value="{{ false }}" disabled />
                </wux-cell>
            </wux-cell-group>
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
        thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
        value1: true,
        value2: false,
        value3: true,
        value4: true,
    },
    onChange(field, e) {
        this.setData({
            [field]: e.detail.value
        })

        console.log('radio发生change事件，携带value值为：', e.detail.value)
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

[Switch](./_media/switch.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| name | <code>string</code> | 在表单中的字段名 | - |
| value | <code>boolean</code> | 在表单中的字段值（当前选中项的值） | - |
| disabled | <code>boolean</code> | 是否不可修改 | false |
| color | <code>string</code> | 主题色 | #09BB07 |
| bind:change | <code>function</code> | change 事件触发的回调函数 | - |