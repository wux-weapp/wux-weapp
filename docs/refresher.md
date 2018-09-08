# Refresher 下拉刷新

用于展现下拉刷新操作，将自定义组件包裹在 `refresher` 组件内。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Refresher",
    "usingComponents": {
        "wux-refresher": "../../dist/refresher/index"
    }
}
```

### 示例

```html
<wux-refresher id="wux-refresher" bind:pulling="onPulling" bind:refresh="onRefresh">
    <view class="weui-panel weui-panel_access">
        <view class="weui-panel__hd">文字组合列表</view>
        <view class="weui-panel__bd">
            <view class="weui-media-box weui-media-box_text" wx:for="{{ items }}" wx:key="">
                <view class="weui-media-box__title weui-media-box__title_in-text">{{ item.title }}</view>
                <view class="weui-media-box__desc">{{ item.content }}</view>
            </view>
        </view>
    </view>
</wux-refresher>
```

```js
import { $stopWuxRefresher } from '../../dist/index'

Page({
    data: {
        items: [{
                title: new Date,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            },
            {
                title: new Date,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            }
        ]
    },
    onLoad() {},
    onPulling() {
        console.log('onPulling')
    },
    onRefresh() {
        console.log('onRefresh')
        setTimeout(() => {
            this.setData({
                items: [{
                    title: new Date,
                    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                }, ...this.data.items],
            })

            $stopWuxRefresher()
        }, 2000)
    },
})
```

## 视频演示

[Refresher](./_media/refresher.mp4 ':include :type=iframe width=375px height=667px')

## API

### Refresher props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| pullingIcon | <code>string</code> | 下拉时图标 | wux-refresher__icon--arrow-down |
| pullingText | <code>string</code> | 下拉时文字描述 | 下拉刷新 |
| refreshingIcon | <code>string</code> | 刷新时图标 | wux-refresher__icon--refresher |
| refreshingText | <code>string</code> | 刷新时文字描述 | 正在刷新 |
| disablePullingRotation | <code>boolean</code> | 是否禁用图标旋转效果 | false |
| distance | <code>number</code> | 下拉的距离 | 30 |
| bind:pulling | <code>function</code> | 下拉开始的回调函数 | - |
| bind:refresh | <code>function</code> | 下拉完成的回调函数 | - |

### Refresher slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |