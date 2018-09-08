# Tag 标签

进行标记和分类的小标签。添加了多种预设色彩的标签样式如 `pink`、`red`、`yellow`、`orange`、`cyan`、`green`、`blue`、`purple`、`geekblue`、`magenta`、`volcano`、`gold`、`lime` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Tag",
    "usingComponents": {
        "wux-tag": "../../dist/tag/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Tag</view>
        <view class="page__desc">标签</view>
    </view>
    <view class="page__bd">
        <wux-tag color="magenta">magenta</wux-tag>
        <wux-tag color="red">red</wux-tag>
        <wux-tag color="volcano">volcano</wux-tag>
        <wux-tag color="orange">orange</wux-tag>
        <wux-tag color="gold">gold</wux-tag>
        <wux-tag color="lime">lime</wux-tag>
        <wux-tag color="green">green</wux-tag>
        <wux-tag color="cyan">cyan</wux-tag>
        <wux-tag color="blue">blue</wux-tag>
        <wux-tag color="geekblue">geekblue</wux-tag>
        <wux-tag color="purple">purple</wux-tag>
        <wux-tag color="#f50">#f50</wux-tag>
        <wux-tag color="#2db7f5">#2db7f5</wux-tag>
        <wux-tag color="#87d068">#87d068</wux-tag>
        <wux-tag color="#108ee9">#108ee9</wux-tag>
    </view>
</view>
```

## 视频演示

[Tag](./_media/tag.mp4 ':include :type=iframe width=375px height=667px')

## API

### Tag props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| color | <code>string</code> | 标签色 | - |
| bind:click | <code>function</code> | 点击事件 | - |

### Tag slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |