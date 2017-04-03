## calendar(id, options)
日历

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.monthNames | <code>array</code> | 月份名称 |
| options.monthNamesShort | <code>array</code> | 月份短名 |
| options.dayNames | <code>array</code> | 星期名称 |
| options.dayNamesShort | <code>array</code> | 星期短名 |
| options.firstDay | <code>number</code> | 设置一周的第一天 |
| options.weekendDays | <code>array</code> | 设置一周顺序 |
| options.multiple | <code>boolean</code> | 设置多选 |
| options.dateFormat | <code>string</code> | 自定义格式化日期 |
| options.direction | <code>string</code> | 动画滚动方向 |
| options.minDate | <code>object</code> | 可选最小日期 |
| options.maxDate | <code>object</code> | 可选最大日期 |
| options.touchMove | <code>boolean</code> | 是否开启手势滑动 |
| options.animate | <code>boolean</code> | 是否开启动画效果 |
| options.closeOnSelect | <code>boolean</code> | 是否开启选中后关闭组件 |
| options.weekHeader | <code>boolean</code> | 是否显示星期 |
| options.toolbar | <code>boolean</code> | 是否显示工具栏 |
| options.inline | <code>boolean</code> | 是否内联样式 |
| options.value | <code>array</code> | 默认值 |
| options.onMonthAdd | <code>function</code> | 选择月份时的回调函数 |
| options.onChange | <code>function</code> | 组件值变化时回调函数 |
| options.onOpen | <code>function</code> | 组件打开时的回调函数 |
| options.onClose | <code>function</code> | 组件关闭时的回调函数 |
| options.onDayClick | <code>function</code> | 选择日期时的回调函数 |
| options.onMonthYearChangeStart | <code>function</code> | 月份切换开始的回调函数 |
| options.onMonthYearChangeEnd | <code>function</code> | 月份切换结束回调函数 |

**Example**  
```html
<import src="../../components/calendar/calendar.wxml"/>

<template is="calendar" data="{{ ...$wux.calendar.birthday }}"/>
<template is="calendar" data="{{ ...$wux.calendar.start }}"/>
<template is="calendar" data="{{ ...$wux.calendar.end }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Calendar</view>
        <view class="page__desc">日历</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">默认设置</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">生日</view>
                </view>
                <view class="weui-cell__bd">
                    <view class="weui-input" bindtap="openCalendar">{{ birthday || 'Your birth date' }}</view>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">自定义日期格式</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">出发日期</view>
                </view>
                <view class="weui-cell__bd">
                    <view class="weui-input" bindtap="openCalendar2">{{ start || 'Select date' }}</view>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">可选多个值</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">离开日期</view>
                </view>
                <view class="weui-cell__bd">
                    <view class="weui-input" bindtap="openCalendar3">{{ end || 'Select multiple dates' }}</view>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
import Calendar from '../../components/calendar/calendar'

Page({
    data: {
        birthday: '', 
        start: '', 
        end: '', 
    },
	onLoad() {},
    openCalendar() {
        if (this.birthday) {
            return this.birthday.show()
        }

        this.birthday = Calendar.init('birthday', {
            value: ['2017-04-15'], 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    birthday: d.join(', ')
                })
            }
        })
    },
    openCalendar2() {
        if (this.start) {
            return this.start.show()
        }

        this.start = Calendar.init('start', {
            dateFormat: 'DD, MM dd, yyyy', 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    start: d.join(', ')
                })
            }
        })
    },
    openCalendar3() {
        if (this.end) {
            return this.end.show()
        }
        
        this.end = Calendar.init('end', {
            multiple: true, 
            closeOnSelect: false, 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    end: d.join(', ')
                })
            }
        })
    }
})
```