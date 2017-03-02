## refresher(options)
下拉刷新

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.onPulling | <code>function</code> | 下拉开始的回调函数 |
| options.onRefresh | <code>function</code> | 下拉完成的回调函数 |

**Example**  
```html
<import src="../../components/refresher/refresher.wxml"/>

<view class="container" style="position: absolute; height: 100%; {{ $wux.refresher.style }}" bindtouchstart="touchstart" bindtouchmove="touchmove" bindtouchend="touchend">
    <template is="refresher" data="{{ ...$wux.refresher }}"/>
    <view class="weui-panel weui-panel_access">
        <view class="weui-panel__hd">文字组合列表</view>
        <view class="weui-panel__bd">
            <view class="weui-media-box weui-media-box_text" wx:for="{{ items }}" wx:key="">
                <view class="weui-media-box__title weui-media-box__title_in-text">{{ item.title }}</view>
                <view class="weui-media-box__desc">{{ item.content }}</view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {
        items: [
            {
                title: new Date, 
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
            },
            {
                title: new Date, 
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
            }
        ]
    },
    onLoad() {
        this.refresher = App.Wux().$wuxRefresher({
            onPulling() {
                console.log('onPulling')
            },
            onRefresh() {
                console.log('onRefresh')
                setTimeout(() => {
                    const items = this.scope.data.items

                    items.unshift({
                        title: new Date, 
                        content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', 
                    })

                    this.scope.setData({
                        items: items, 
                    })
                    
                    this.events.emit(`scroll.refreshComplete`)
                }, 2000)
            }
        })
        console.log(this.refresher)
    },
    touchstart(e) {
        this.refresher.touchstart(e)
    }, 
    touchmove(e) {
        this.refresher.touchmove(e)
    }, 
    touchend(e) {
        this.refresher.touchend(e)
    }, 
})
```