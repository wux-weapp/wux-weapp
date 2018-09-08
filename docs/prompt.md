# Prompt 提示信息

用于展现异常流提示信息。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Prompt",
    "usingComponents": {
        "wux-prompt": "../../dist/prompt/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__bd">
        <view class="weui-tab">
            <view class="weui-navbar">
                <block wx:for-items="{{ tabs}}" wx:key="{{ index }}">
                    <view data-id="{{ index }}" class="weui-navbar__item {{ activeIndex == index ? 'weui-bar__item_on' : '' }}" bindtap="tabClick">
                        <view class="weui-navbar__title">{{ item }}</view>
                    </view>
                </block>
                <view class="weui-navbar__slider" style="left: {{ sliderLeft }}px; transform: translateX({{ sliderOffset }}px); -webkit-transform: translateX({{ sliderOffset }}px);"></view>
            </view>
            <view class="weui-tab__panel">
                <view class="weui-tab__content" hidden="{{ activeIndex !== 0 }}">
                    <wux-prompt visible="{{ activeIndex === 0 }}" title="{{ msg1.title }}" text="{{ msg1.text }}" />
                </view>
                <view class="weui-tab__content" hidden="{{ activeIndex !== 1 }}">
                    <wux-prompt visible="{{ activeIndex === 1 }}" icon="{{ msg2.icon }}" title="{{ msg2.title }}" text="{{ msg2.text }}" buttons="{{ msg2.buttons }}" bind:click="buttonClicked" />
                </view>
                <view class="weui-tab__content" hidden="{{ activeIndex !== 2 }}">
                    <wux-prompt visible="{{ activeIndex === 2 }}" icon="{{ msg3.icon }}" title="{{ msg3.title }}" />
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const sliderWidth = 96

Page({
    data: {
        tabs: ['全部', '待收货', '待评价'],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        msg1: {
            title: '空空如也',
            text: '暂时没有相关数据',
        },
        msg2: {
            icon: '../../assets/images/iconfont-order.png',
            title: '您还没有相关的订单',
            text: '可以去看看有哪些想买',
            buttons: [{
                text: '随便逛逛',
            }],
        },
        msg3: {
            icon: '../../assets/images/iconfont-empty.png',
            title: '暂无待评价订单',
        },
    },
    onLoad() {
        this.getSystemInfo()
    },
    getSystemInfo() {
        const that = this
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                })
            }
        })
    },
    tabClick(e) {
        const { offsetLeft, dataset } = e.currentTarget
        const { id } = dataset

        this.setData({
            sliderOffset: offsetLeft,
            activeIndex: id,
        })
    },
    buttonClicked(e) {
        console.log(e)
    },
})
```

## 视频演示

[Prompt](./_media/prompt.mp4 ':include :type=iframe width=375px height=667px')

## API

### Prompt props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| icon | <code>string</code> | 图标 | - |
| title | <code>string</code> | 标题 | - |
| text | <code>string</code> | 文本 | - |
| buttons | <code>array</code> | 按钮 | [] |
| buttons[].text | <code>string</code> | 按钮的文本 | - |
| visible | <code>boolean</code> | 是否显示组件 | false |
| bind:click | <code>function</code> | 按钮点击事件 | - |