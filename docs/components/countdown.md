## countdown(options)
倒计时

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.date | <code>string</code> | 日期 |
| options.refresh | <code>number</code> | 刷新时间 |
| options.offset | <code>number</code> | 偏移量 |
| options.onEnd | <code>function</code> | 倒计时结束后的回调函数 |
| options.render | <code>function</code> | 渲染组件的回调函数 |

**Example**  
```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">CountDown</view>
        <view class="page__desc">倒计时</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input weui-cell_vcode">
                <view class="weui-cell__hd">
                    <view class="weui-label">手机号</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入手机号" />
                </view>
                <view class="weui-cell__ft">
                    <view class="weui-vcode-btn" bindtap="vcode">{{ c2 || '获取验证码' }}</view>
                </view>
            </view>
        </view>
        <view class="text-center">
            <view class="countdown">{{ c1 }}</view>
            <view class="countdown">{{ c3 }}</view>
        </view>
        <view class="weui-btn-area text-center">
            <button class="weui-btn" type="primary" size="mini" bindtap="stop">Stop</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="start">Start</button>
            <button class="weui-btn" type="primary" size="mini" bindtap="update">Update</button>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {},
    onLoad() {
        const that = this
        that.$wuxCountDown = App.Wux().$wuxCountDown

        that.c1 = that.$wuxCountDown({
            date: 'June 7, 2087 15:03:25', 
            render(date) {
                const years = this.leadingZeros(date.years, 4)  + ' 年 '
                const days = this.leadingZeros(date.days, 3)  + ' 天 '
                const hours = this.leadingZeros(date.hours, 2)  + ' 时 '
                const min = this.leadingZeros(date.min, 2)  + ' 分 '
                const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '

                that.setData({
                    c1: years + days + hours + min + sec, 
                })
            }, 
        })

        that.c3 = that.$wuxCountDown({
            date: +(new Date) + 60000 * 20, 
            render(date) {
                const min = this.leadingZeros(date.min, 2)  + ' 分 '
                const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '

                that.setData({
                    c3: min + sec, 
                })
            },
        })
    },
    vcode() {
        const that = this
        if (that.c2 && that.c2.interval) return !1
        that.c2 = that.$wuxCountDown({
            date: +(new Date) + 60000, 
            onEnd() {
                that.setData({
                    c2: '重新获取验证码', 
                })
            },
            render(date) {
                const sec = this.leadingZeros(date.sec, 2)  + ' 秒 '
                date.sec !== 0 && that.setData({
                    c2: sec, 
                })
            },
        })
    },
    stop() {
        this.c3.stop()
    },
    start() {
        this.c3.start()
    },
    update() {
        this.c3.update(+(new Date) + 60000 * 30)
    },
})
```