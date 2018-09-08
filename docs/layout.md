# Layout 栅格布局

12 栅格系统，布局时基于行 `row` 和列 `col` 来定义信息区块的外部框架，具体使用方法如下：

  - 使用 `row` 在水平方向创建一行
  - 将一组 `col` 插入在 `row` 中
  - 在每个 `col` 中，键入自己的内容
  - 通过设置 `col` 的 `span` 参数，指定跨越的范围，其范围是1到12
  - 每个 `row` 中的 `col` 总和应该为12

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Layout",
    "usingComponents": {
        "wux-row": "../../dist/row/index",
        "wux-col": "../../dist/col/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Layout</view>
        <view class="page__desc">栅格布局</view>
    </view>
    <view class="page__bd">
        <wux-row>
            <wux-col span="12">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="6">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="6">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" offset="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" push="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" offset="4" pull="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
    </view>
</view>
```

## 视频演示

[Layout](./_media/layout.mp4 ':include :type=iframe width=375px height=667px')

## API

### Row props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| gutter | <code>number</code> | 栅格间隔 | 0 |

### Col props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| span | <code>number</code> | 栅格占位格数 | 0 |
| pull | <code>number</code> | 栅格向左移动格数 | 0 |
| push | <code>number</code> | 栅格向右移动格数 | 0 |
| offset | <code>number</code> | 栅格左侧的间隔格数 | 0 |

### Col slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |