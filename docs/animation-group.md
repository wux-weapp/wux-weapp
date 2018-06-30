# AnimationGroup 动画组

将自定义的组件包裹在 `animation-group` 组件内，可以实现过渡/动画效果，预设 9 种过渡效果 `fadeIn`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `fadeInUp`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight` 可选用。

在进入/离开的过渡中，会有 6 个 class 切换：

- `-enter`: 进入过渡的开始状态，在过渡过程完成之后移除
- `-enter-active`: 进入过渡的结束状态，在过渡过程完成之后移除
- `-enter-done`: 进入过渡的完成状态
- `-exit`: 离开过渡的开始状态，在过渡过程完成之后移除
- `-exit-active`: 离开过渡的结束状态，在过渡过程完成之后移除
- `-exit-done`: 离开过渡的完成状态

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "AnimationGroup",
    "usingComponents": {
        "wux-animation-group": "../../dist/animation-group/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">AnimationGroup</view>
        <view class="page__desc">动画组</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell weui-cell_select">
                <view class="weui-cell__hd weui-cell__hd_in-select-after">
                    <view class="weui-label" style="width: auto;">Switch classNames</view>
                </view>
                <view class="weui-cell__bd">
                    <picker bindchange="pickerChange" value="{{ index }}" range="{{ items }}">
                        <view class="weui-select weui-select_in-select-after" style="padding-left: 30px;">{{ items[index] }}</view>
                    </picker>
                </view>
            </view>
            <view class="weui-cell weui-cell_switch">
                <view class="weui-cell__bd">Enable or disable enter transitions</view>
                <view class="weui-cell__ft">
                    <switch data-model="example.enter" bindchange="switchChange" checked="{{ example.enter }}" />
                </view>
            </view>
            <view class="weui-cell weui-cell_switch">
                <view class="weui-cell__bd">Enable or disable exit transitions</view>
                <view class="weui-cell__ft">
                    <switch data-model="example.exit" bindchange="switchChange" checked="{{ example.exit }}" />
                </view>
            </view>
            <view class="weui-cell weui-cell_switch">
                <view class="weui-cell__bd">Switch state</view>
                <view class="weui-cell__ft">
                    <switch data-model="example.in" bindchange="switchChange" checked="{{ example.in }}" />
                </view>
            </view>
        </view>
        <wux-animation-group wux-class="example" in="{{ example.in }}" enter="{{ example.enter }}" exit="{{ example.exit }}" class-names="{{ example.classNames }}" bind:click="onClick" bind:enter="onEnter" bind:entering="onEntering" bind:entered="onEntered" bind:exit="onExit"
            bind:exiting="onExiting" bind:exited="onExited">
            <view class="weui-article">
                <view class="weui-article__h1">大标题</view>
                <view class="weui-article__section">
                    <view class="weui-article__title">章标题</view>
                    <view class="weui-article__section">
                        <view class="weui-article__h3">1.1 节标题</view>
                        <view class="weui-article__p">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </view>
                    </view>
                </view>
            </view>
        </wux-animation-group>
    </view>
</view>
```

```js
Page({
    data: {
        items: [
            'fadeIn',
            'fadeInDown',
            'fadeInLeft',
            'fadeInRight',
            'fadeInUp',
            'slideInUp',
            'slideInDown',
            'slideInLeft',
            'slideInRight',
        ],
        index: 0,
        example: {
            classNames: 'wux-animate--fadeIn',
            enter: true,
            exit: true,
            in: false,
        },
    },
    pickerChange(e) {
        const index = e.detail.value
        const value = this.data.items[index]
        const classNames = `wux-animate--${value}`

        this.setData({
            index,
            'example.classNames': classNames,
        })
    },
    switchChange(e) {
        const { model } = e.currentTarget.dataset

        this.setData({
            [model]: e.detail.value,
        })
    },
    onClick() { console.log('onClick') },
    onEnter() { console.log('onEnter') },
    onEntering() { console.log('onEntering') },
    onEntered() { console.log('onEntered') },
    onExit() { console.log('onExit') },
    onExiting() { console.log('onExiting') },
    onExited() { console.log('onExited') },
})
```

## 视频演示

[AnimationGroup](./_media/animation-group.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| in | <code>boolean</code> | 触发组件进入或离开过渡的状态 | false |
| classNames | <code>any</code> | 过渡的类名 | - |
| duration | <code>any</code> | 过渡持续时间 | - |
| type | <code>string</code> | 过渡动效的类型 | transition |
| enter | <code>boolean</code> | 是否启用进入过渡 | true |
| exit | <code>boolean</code> | 是否启用离开过渡 | true |
| bind:click | <code>function</code> | 点击组件时触发的回调函数 | - |
| bind:enter | <code>function</code> | 进入过渡的开始状态时触发的回调函数 | - |
| bind:entering | <code>function</code> | 进入过渡的结束状态时触发的回调函数 | - |
| bind:entered | <code>function</code> | 进入过渡的完成状态时触发的回调函数 | - |
| bind:exit | <code>function</code> | 离开过渡的开始状态时触发的回调函数 | - |
| bind:exiting | <code>function</code> | 离开过渡的结束状态时触发的回调函数 | - |
| bind:exited | <code>function</code> | 离开过渡的完成状态时触发的回调函数 | - |