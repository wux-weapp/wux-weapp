## countup(startVal, endVal, decimals, duration, options)
计数器

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| startVal | <code>number</code> | 起始值 |
| endVal | <code>number</code> | 结束值 |
| decimals | <code>number</code> | 小数点位数 |
| duration | <code>number</code> | 刷新时间 |
| options | <code>object</code> | 配置项 |
| options.useEasing | <code>boolean</code> | 是否开启过渡动画 |
| options.useGrouping | <code>boolean</code> | 是否分隔数值 |
| options.separator | <code>string</code> | 分隔符 |
| options.decimal | <code>string</code> | 小数点符号 |
| options.easingFn | <code>function</code> | 自定义过渡动画 |
| options.formattingFn | <code>function</code> | 自定义格式化函数 |
| options.printValue | <code>function</code> | 渲染组件的回调函数 |

**Example**  
```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">CountUp</view>
        <view class="page__desc">计数器</view>
    </view>
    <view class="page__bd">
        <view class="text-center">
            <view class="countup">{{ c1 }}</view>
            <view class="countup">{{ c2 }}</view>
            <view class="countup">{{ c3 }}</view>
        </view>
        <view class="weui-btn-area text-center">
            <button class="weui-btn" type="primary" size="mini" bindtap="start">Start</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="pauseResume">Pause/Resume</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="reset">Reset</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="update">Update</button>
        </view>
    </view>
</view>
```

```js
import { $wuxCountUp } from '../../components/wux'

Page({
    data: {},
    onLoad() {
        this.c1 = new $wuxCountUp(1, 1024, 0, 2, {
            printValue(value) {
                this.setData({
                    c1: value, 
                })
            }
        })

        this.c2 = new $wuxCountUp(0, 88.88, 2, 2, {
            printValue(value) {
                this.setData({
                    c2: value, 
                })
            }
        })

        this.c3 = new $wuxCountUp(0, 520, 0, 2, {
            printValue(value) {
                this.setData({
                    c3: value, 
                })
            }
        })
        
        this.c1.start()
        this.c2.start()
    },
    start() {
        this.c3.start(() => {
            wx.showToast({
                title: '已完成', 
            })
        })
    },
    reset() {
        this.c3.reset()
    },
    update() {
        this.c3.update(1314)
    },
    pauseResume() {
        this.c3.pauseResume()
    },
})
```