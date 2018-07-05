# List 列表

基础布局组件，布局时基于 `cell-group` 和 `cell` 来定义信息区块的外部框架。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "List",
    "usingComponents": {
        "wux-cell-group": "../../dist/cell-group/index",
        "wux-cell": "../../dist/cell/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">List</view>
        <view class="page__desc">列表</view>
    </view>
    <view class="page__bd">
        <wux-cell-group title="带说明的列表项">
            <wux-cell title="标题文字"></wux-cell>
            <wux-cell title="标题文字"></wux-cell>
        </wux-cell-group>
        <wux-cell-group title="带图标、说明的列表项">
            <wux-cell thumb="{{ thumb }}" title="标题文字" extra="说明文字"></wux-cell>
            <wux-cell thumb="{{ thumb }}" title="标题文字" extra="说明文字"></wux-cell>
        </wux-cell-group>
        <wux-cell-group title="带跳转的列表项" label="底部说明文字">
            <wux-cell title="标题文字" is-link extra="说明文字"></wux-cell>
            <wux-cell title="标题文字" is-link label="附加描述" extra="说明文字"></wux-cell>
            <wux-cell title="只显示箭头" is-link></wux-cell>
            <wux-cell title="跳转到首页" is-link url="/pages/index/index" open-type="switchTab"></wux-cell>
        </wux-cell-group>
    </view>
</view>
```

```js
Page({
    data: {
        thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=',
    },
})
```


## 视频演示

[List](./_media/list.mp4 ':include :type=iframe width=375px height=667px')

## API

### CellGroup

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |

### Cell

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| thumb | <code>string</code> | 左侧缩略图 | - |
| title | <code>string</code> | 左侧标题 | - |
| label | <code>string</code> | 标题下方的描述信息 | - |
| extra | <code>string</code> | 右侧内容 | - |
| isLink | <code>boolean</code> | 是否展示右侧箭头并开启尝试以 url 跳转 | - |
| open-type | <code>string</code> | 跳转方式，可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch | navigateTo |
| url | <code>string</code> | 跳转链接 | - |
| delta | <code>number</code> | 当 open-type 为 'navigateBack' 时有效，表示回退的层数 | 1 |
| bind:click | <code>function</code> | 点击事件 | - |