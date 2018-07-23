# CountDown 倒计时

用于展现倒计时。

## 使用指南

### 示例

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
            <button type="primary" size="mini" bindtap="stop">Stop</button>
            <button type="primary" size="mini" bindtap="start">Start</button>
            <button type="primary" size="mini" bindtap="update">Update</button>
        </view>
    </view>
</view>
```

```js
import { $wuxCountDown } from '../../dist/index'

Page({
    data: {},
    onLoad() {
        this.c1 = new $wuxCountDown({
            date: 'June 7, 2087 15:03:25',
            render(date) {
                const years = this.leadingZeros(date.years, 4) + ' 年 '
                const days = this.leadingZeros(date.days, 3) + ' 天 '
                const hours = this.leadingZeros(date.hours, 2) + ' 时 '
                const min = this.leadingZeros(date.min, 2) + ' 分 '
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

                this.setData({
                    c1: years + days + hours + min + sec,
                })
            },
        })

        this.c3 = new $wuxCountDown({
            date: +(new Date) + 60000 * 20,
            render(date) {
                const min = this.leadingZeros(date.min, 2) + ' 分 '
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

                this.setData({
                    c3: min + sec,
                })
            },
        })
    },
    vcode() {
        if (this.c2 && this.c2.interval) return !1
        this.c2 = new $wuxCountDown({
            date: +(new Date) + 60000,
            onEnd() {
                this.setData({
                    c2: '重新获取验证码',
                })
            },
            render(date) {
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
                date.sec !== 0 && this.setData({
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

## 视频演示

[CountDown](./_media/countdown.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.date | <code>string</code> | 日期 | June 7, 2087 15:03:25 |
| options.refresh | <code>number</code> | 刷新时间 | 1000 |
| options.offset | <code>number</code> | 偏移量 | 0 |
| options.onEnd | <code>function</code> | 倒计时结束后的回调函数 | - |
| options.render | <code>function</code> | 渲染组件的回调函数 | - |