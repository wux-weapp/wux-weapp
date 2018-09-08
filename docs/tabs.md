# Tabs 标签页

选项卡切换组件，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Tabs",
    "usingComponents": {
        "wux-tabs": "../../dist/tabs/index",
        "wux-tab": "../../dist/tab/index",
        "wux-badge": "../../dist/badge/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Tabs</view>
        <view class="page__desc">标签页</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-tabs default-current="tab1">
            <wux-tab key="tab1" title="Tab 1"></wux-tab>
            <wux-tab key="tab2" title="Tab 2"></wux-tab>
            <wux-tab key="tab3" title="Tab 3"></wux-tab>
        </wux-tabs>
        <view class="sub-title">Theme = positive</view>
        <wux-tabs default-current="tab1" theme="positive">
            <wux-tab key="tab1" title="Tab 1"></wux-tab>
            <wux-tab key="tab2" title="Tab 2"></wux-tab>
            <wux-tab key="tab3" title="Tab 3"></wux-tab>
        </wux-tabs>
        <view class="sub-title">Disabled</view>
        <wux-tabs default-current="tab1">
            <wux-tab key="tab1" title="Tab 1"></wux-tab>
            <wux-tab disabled key="tab2" title="Tab 2"></wux-tab>
            <wux-tab key="tab3" title="Tab 3"></wux-tab>
        </wux-tabs>
        <view class="sub-title">Auto = false</view>
        <wux-tabs auto="{{ false }}" current="{{ current }}" bindchange="onChange">
            <wux-tab key="tab1" title="Tab 1"></wux-tab>
            <wux-tab key="tab2" title="Tab 2"></wux-tab>
            <wux-tab key="tab3" title="Tab 3"></wux-tab>
        </wux-tabs>
        <view class="sub-title">Slot</view>
        <wux-tabs auto="{{ false }}" current="{{ current }}" bindchange="onChange">
            <wux-tab disabled key="tab1">
                <image src="http://pbqg2m54r.bkt.clouddn.com/logo.png" style="width: 20px; height: 20px; margin-right: 5px;" />
                <text>Tab 1</text>
            </wux-tab>
            <wux-tab key="tab2">
                <image src="http://pbqg2m54r.bkt.clouddn.com/logo.png" style="width: 20px; height: 20px; margin-right: 5px;" />
                <text>Tab 2</text>
            </wux-tab>
            <wux-tab key="tab3">
                <image src="http://pbqg2m54r.bkt.clouddn.com/logo.png" style="width: 20px; height: 20px; margin-right: 5px;" />
                <text>Tab 3</text>
            </wux-tab>
        </wux-tabs>
        <view class="sub-title">Scroll</view>
        <wux-tabs auto="{{ false }}" scroll current="{{ current }}" bindchange="onChange">
            <wux-tab key="tab1" title="Tab 1"></wux-tab>
            <wux-tab key="tab2" title="Tab 2"></wux-tab>
            <wux-tab key="tab3" title="Tab 3"></wux-tab>
            <wux-tab key="tab4" title="Tab 4"></wux-tab>
            <wux-tab key="tab5" title="Tab 5"></wux-tab>
            <wux-tab key="tab6" title="Tab 6"></wux-tab>
            <wux-tab key="tab7" title="Tab 7"></wux-tab>
            <wux-tab key="tab8" title="Tab 8"></wux-tab>
            <wux-tab key="tab9" title="Tab 9"></wux-tab>
        </wux-tabs>
        <view class="sub-title">Badge</view>
        <wux-tabs auto="{{ false }}" current="{{ current }}" bindchange="onChange">
            <wux-tab key="tab1">
                <wux-badge count="3">Tab 1</wux-badge>
            </wux-tab>
            <wux-tab key="tab2">
                <wux-badge count="1024">Tab 2</wux-badge>
            </wux-tab>
            <wux-tab key="tab3">
                <wux-badge dot>Tab 3</wux-badge>
            </wux-tab>
        </wux-tabs>
        <view class="sub-title">With Swiper</view>
        <wux-tabs wux-class="bordered" auto="{{ false }}" current="{{ key }}" bindchange="onTabsChange">
            <block wx:for="{{ tabs }}" wx:key="key">
                <wux-tab key="{{ item.key }}" title="{{ item.title }}"></wux-tab>
            </block>
        </wux-tabs>
        <swiper current="{{ index }}" bindchange="onSwiperChange">
            <block wx:for="{{ tabs }}" wx:key="key">
                <swiper-item>
                    <view class="content">{{ item.content }}</view>
                </swiper-item>
            </block>
        </swiper>
    </view>
</view>
```

```js
Page({
    data: {
        current: 'tab1',
        tabs: [
            {
                key: 'tab1',
                title: 'Tab 1',
                content: 'Content of tab 1',
            },
            {
                key: 'tab2',
                title: 'Tab 2',
                content: 'Content of tab 2',
            },
            {
                key: 'tab3',
                title: 'Tab 3',
                content: 'Content of tab 3',
            },
        ],
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
    },
    onTabsChange(e) {
        console.log('onTabsChange', e)
        const { key } = e.detail
        const index = this.data.tabs.map((n) => n.key).indexOf(key)

        this.setData({
            key,
            index,
        })
    },
    onSwiperChange(e) {
        console.log('onSwiperChange', e)
        const { current: index, source } = e.detail
        const { key } = this.data.tabs[index]

        if (!!source) {
            this.setData({
                key,
                index,
            })
        }
    },
})
```

## 视频演示

[Tabs](./_media/tabs.mp4 ':include :type=iframe width=375px height=667px')

## API

### Tabs props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| defaultCurrent | <code>string</code> | 默认激活 tab 面板的 key，当 auto 为 true 时才生效 | - |
| current | <code>string</code> | 用于手动激活 tab 面板的 key，当 auto 为 false 时才生效 | - |
| scroll | <code>boolean</code> | 是否开启横向滚动 | false |
| auto | <code>boolean</code> | 是否自动控制激活 tab 面板 | true |
| theme | <code>string</code> | 主题色，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| bind:change | <code>function</code> | 切换面板的回调函数 | - |

### Tab props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | <code>string</code> | 对应 key | - |
| title | <code>string</code> | 选项卡标题 | - |
| disabled | <code>boolean</code> | 是否禁用 | false |

### Tab slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |