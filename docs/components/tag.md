## Tag
标签

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| color | <code>string</code> | 标签色 | - |
| bind:click | <code>function</code> | 点击事件 | - |

**Example**
```json
{
    "navigationBarTitleText": "Tag",
    "usingComponents": {
        "wux-tag": "../../dist/tag/index"
    }
}
```

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