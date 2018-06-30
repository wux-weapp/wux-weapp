# Spin 加载中

用于页面和区块的加载中状态。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Spin",
    "usingComponents": {
        "wux-spin": "../../dist/spin/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Spin</view>
        <view class="page__desc">加载中</view>
    </view>
    <view class="page__bd">
        <wux-spin spinning="{{ spinning }}" tip="Loading..." size="default">
            <view class="weui-article">
                <view class="weui-article__h1">大标题</view>
                <view class="weui-article__section">
                    <view class="weui-article__title">章标题</view>
                    <view class="weui-article__section">
                        <view class="weui-article__h3">1.1 节标题</view>
                        <view class="weui-article__p">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </view>
                    </view>
                </view>
            </view>
        </wux-spin>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_switch">
                <view class="weui-cell__bd">Loading state</view>
                <view class="weui-cell__ft">
                    <switch bindchange="switchChange" checked="{{ spinning }}" />
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
Page({
    switchChange(e) {
        this.setData({
            spinning: e.detail.value,
        })
    },
})
```

## 视频演示

[Spin](./_media/spin.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| tip | <code>string</code> | 当作为包裹元素时，可以自定义描述文案 | - |
| size | <code>string</code> | 组件大小，可选值为 small/default/large | default |
| spinning | <code>boolean</code> | 是否旋转 | false |