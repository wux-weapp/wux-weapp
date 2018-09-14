# TabBar 标签栏

标签栏用于在不同功能模块之间进行切换，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "TabBar",
    "usingComponents": {
        "wux-icon": "../../dist/icon/index",
        "wux-badge": "../../dist/badge/index",
        "wux-tabbar": "../../dist/tabbar/index",
        "wux-tabbar-item": "../../dist/tabbar-item/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">TabBar</view>
        <view class="page__desc">标签栏</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-tabbar default-current="tab2">
            <wux-tabbar-item key="tab1" title="Tab 1">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item key="tab2" title="Tab 2">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item key="tab3" title="Tab 3">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
        </wux-tabbar>
        <view class="sub-title">Theme = positive</view>
        <wux-tabbar default-current="1" theme="positive">
            <wux-tabbar-item title="Tab 1">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 2">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 3">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
        </wux-tabbar>
        <view class="sub-title">Disabled</view>
        <wux-tabbar default-current="1">
            <wux-tabbar-item title="Tab 1">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 2" disabled>
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 3">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
        </wux-tabbar>
        <view class="sub-title">Auto = false</view>
        <wux-tabbar auto="{{ false }}" current="{{ current }}" bindchange="onChange">
            <wux-tabbar-item title="Tab 1">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 2">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 3">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
        </wux-tabbar>
        <view class="sub-title">With Badge</view>
        <wux-tabbar default-current="1" position="bottom">
            <wux-tabbar-item title="Tab 1">
                <wux-badge count="1" slot="icon-on">
                    <wux-icon wux-class="icon" type="ios-home" size="22" />
                </wux-badge>
                <wux-badge count="1" slot="icon-off">
                    <wux-icon wux-class="icon" type="ios-home" size="22" />
                </wux-badge>
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 2">
                <wux-badge dot slot="icon-on">
                    <wux-icon wux-class="icon" type="ios-home" size="22" />
                </wux-badge>
                <wux-badge dot slot="icon-off">
                    <wux-icon wux-class="icon" type="ios-home" size="22" />
                </wux-badge>
            </wux-tabbar-item>
            <wux-tabbar-item title="Tab 3">
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-on" />
                <wux-icon wux-class="icon" type="ios-home" size="22" slot="icon-off" />
            </wux-tabbar-item>
        </wux-tabbar>
    </view>
</view>
```

```js
Page({
    data: {
        current: '1',
    },
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            current: e.detail.key,
        })
    },
})
```

## 视频演示

[TabBar](./_media/tabbar.mp4 ':include :type=iframe width=375px height=667px')

## API

### TabBar props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| defaultCurrent | <code>string</code> | 默认激活 tab 面板的 key，当 auto 为 true 时才生效 | - |
| current | <code>string</code> | 用于手动激活 tab 面板的 key，当 auto 为 false 时才生效 | - |
| auto | <code>boolean</code> | 是否自动控制激活 tab 面板 | true |
| theme | <code>string</code> | 主题色，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| position | <code>string</code> | 标签栏位置，可选值为 bottom、top | - |
| bind:change | <code>function</code> | 切换面板的回调函数 | - |

### TabBarItem props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | <code>string</code> | 对应 key | - |
| title | <code>string</code> | 选项卡标题 | - |
| disabled | <code>boolean</code> | 是否禁用 | false |
| bind:click | <code>function</code> | 点击事件 | - |

### TabBarItem slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义标题 |
| icon-on | 自定义默认展示图标 |
| icon-off | 自定义选中后的展示图标 |