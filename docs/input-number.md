# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 使用指南

### 在 page.json 中引入组件

```json
{
	"navigationBarTitleText": "InputNumber",
	"usingComponents": {
        "wux-input-number": "../../dist/input-number/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">InputNumber</view>
        <view class="page__desc">数字输入框</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">默认</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置 callback 回调函数，在调试窗口中输出</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number bind:change="bindchange" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置宽度为100px</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number wux-input-class="wux-input-number__input--custom" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置步长为0.5</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number step="{{ .5 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置值为1，最小值为-5，最大值为8</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number value="{{ 1 }}" min="{{ -5 }}" max="{{ 8 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置可输入</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number disabled="{{ false }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">设置长按快速加减</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">数量</view>
                <view class="weui-cell__ft">
                    <wux-input-number longpress="{{ true }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">循环输出多个组件</view>
        <view class="weui-cells weui-cells_after-title">
            <block wx:for="{{ items }}" wx:key="">
                <view class="weui-cell">
                    <view class="weui-cell__bd">{{ item.text }}</view>
                    <view class="weui-cell__ft">
                        <wux-input-number value="{{ item.value }}" />
                    </view>
                </view>
            </block>
        </view>
    </view>
</view>
```

```js
Page({
    data: {
        items: [{
                id: '001',
                text: '房间',
                value: 1,
            },
            {
                id: '002',
                text: '成人',
                value: 2,
            },
        ],
    },
    bindchange(e) {
        console.log(e)
    },
})
```

## 视频演示

[InputNumber](./_media/input-number.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| min | <code>number</code> | 最小值 | -999999 |
| max | <code>number</code> | 最大值 | 999999 |
| step | <code>number</code> | 计数间隔 | 1 |
| value | <code>number</code> | 默认值 | 0 |
| disabled | <code>boolean</code> | 禁用输入 | true |
| longpress | <code>boolean</code> | 禁用长按 | false |
| className | <code>string</code> | 自定义类名 | - |
| bind:change | <code>function</code> | 监听值变化的回调函数 | - |