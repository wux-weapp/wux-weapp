## prompt(id, options)
提示信息

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.className | <code>string</code> | 自定义类名 |
| options.icon | <code>string</code> | 图标 |
| options.title | <code>string</code> | 标题 |
| options.text | <code>string</code> | 文本 |
| options.buttons | <code>array</code> | 按钮 |
| options.buttons[].text | <code>string</code> | 按钮的文本 |
| options.buttonClicked | <code>function</code> | 按钮点击事件 |

**Example**  
```html
<import src="../../components/prompt/prompt.wxml"/>

<view class="page">
    <view class="page__bd">
        <view class="weui-tab">
            <view class="weui-navbar">
                <block wx:for-items="{{ tabs}}" wx:key="{{ index }}">
                    <view id="{{ index }}" class="weui-navbar__item {{ activeIndex == index ? 'weui-bar__item_on' : '' }}" bindtap="tabClick">
                        <view class="weui-navbar__title">{{ item }}</view>
                    </view>
                </block>
                <view class="weui-navbar__slider" style="left: {{ sliderLeft }}px; transform: translateX({{ sliderOffset }}px); -webkit-transform: translateX({{ sliderOffset }}px);"></view>
            </view>
            <view class="weui-tab__panel">
                <view class="weui-tab__content" hidden="{{ activeIndex != 0 }}">
                    <template is="prompt" data="{{ ...$wux.prompt.msg1 }}"/>
                </view>
                <view class="weui-tab__content" hidden="{{ activeIndex != 1 }}">
                    <template is="prompt" data="{{ ...$wux.prompt.msg2 }}"/>
                </view>
                <view class="weui-tab__content" hidden="{{ activeIndex != 2 }}">
                    <template is="prompt" data="{{ ...$wux.prompt.msg3 }}"/>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()
const sliderWidth = 96

Page({  
    data: {
        tabs: ['全部', '待收货', '待评价'],
        activeIndex: '0',
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad() {
        this.$wuxPrompt = App.Wux().$wuxPrompt
        this.$wuxPrompt.init('msg1', {
            title: '空空如也', 
            text: '暂时没有相关数据', 
        }).show()

        this.$wuxPrompt.init('msg2', {
            icon: '../../assets/images/iconfont-order.png', 
            title: '您还没有相关的订单', 
            text: '可以去看看有哪些想买', 
            buttons: [
                {
                    text: '随便逛逛'
                }
            ],
            buttonClicked(index, item) {
                console.log(index, item)
            },
        }).show()

        this.$wuxPrompt.init('msg3', {
            icon: '../../assets/images/iconfont-empty.png', 
            title: '暂无待评价订单', 
        }).show()

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
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft, 
            activeIndex: e.currentTarget.id, 
        })
    },
})
```