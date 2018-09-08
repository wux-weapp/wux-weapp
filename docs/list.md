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
            <wux-cell thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="标题文字" extra="说明文字"></wux-cell>
            <wux-cell thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" title="标题文字" extra="说明文字"></wux-cell>
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

## 视频演示

[List](./_media/list.mp4 ':include :type=iframe width=375px height=667px')

## API

### CellGroup props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | <code>string</code> | 标题 | - |
| label | <code>string</code> | 描述 | - |

### Cell props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| hoverClass | <code>string</code> | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 | wux-cell--hover |
| thumb | <code>string</code> | 左侧缩略图 | - |
| title | <code>string</code> | 左侧标题 | - |
| label | <code>string</code> | 标题下方的描述信息 | - |
| extra | <code>string</code> | 右侧内容 | - |
| isLink | <code>boolean</code> | 是否展示右侧箭头并开启尝试以 url 跳转 | - |
| openType | <code>string</code> | 跳转方式，可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch | navigateTo |
| url | <code>string</code> | 跳转链接 | - |
| delta | <code>number</code> | 当 open-type 为 'navigateBack' 时有效，表示回退的层数 | 1 |
| bind:click | <code>function</code> | 点击事件 | - |

### Cell slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义标题或描述 |
| header | 自定义左侧缩略图 |
| footer | 自定义右侧内容 |