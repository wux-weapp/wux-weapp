# Badge 徽章

图标右上角的圆形徽标数字。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Badge",
    "usingComponents": {
        "wux-badge": "../../dist/badge/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Badge</view>
        <view class="page__desc">徽章</view>
    </view>
    <view class="page__bd">
        <view class="example">
            <wux-badge dot="{{ true }}">
                <view class="example__badge"></view>
            </wux-badge>
        </view>
        <view class="example">
            <wux-badge count="0" show-zero="{{ true }}">
                <view class="example__badge"></view>
            </wux-badge>
        </view>
        <view class="example">
            <wux-badge count="3">
                <view class="example__badge"></view>
            </wux-badge>
        </view>
        <view class="example">
            <wux-badge count="100">
                <view class="example__badge"></view>
            </wux-badge>
        </view>
        <view class="example">
            <wux-badge count="9999" overflow-count="1024">
                <view class="example__badge"></view>
            </wux-badge>
        </view>
        <view class="example">
            <wux-badge count="66" />
        </view>
        <view class="example">
            <wux-badge count="88" wux-class-badge="bg-green" />
        </view>
        <view class="example">
            <wux-badge status="success" />
        </view>
        <view class="example">
            <wux-badge status="error" />
        </view>
        <view class="example">
            <wux-badge status="default" />
        </view>
        <view class="example">
            <wux-badge status="processing" />
        </view>
        <view class="example">
            <wux-badge status="warning" text="Warning" />
        </view>
    </view>
</view>
```

## 视频演示

[Badge](./_media/badge.mp4 ':include :type=iframe width=375px height=667px')

## API

### Badge props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| count | <code>number</code> | 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 | 0 |
| overflowCount | <code>number</code> | 展示封顶的数字值 | 99 |
| dot | <code>boolean</code> | 不展示数字，只有一个小红点 | false |
| showZero | <code>boolean</code> | 当数值为 0 时，是否展示 Badge | false |
| status | <code>string</code> | 设置 Badge 为状态点，可选值为 success、processing、default、error、warning | - |
| text | <code>string</code> | 在设置了 status 的前提下有效，设置状态点的文本 | - |

### Badge slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |