## rater(id, options)
评分组件

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| id | <code>string</code> | 唯一标识 |
| options | <code>object</code> | 配置项 |
| options.max | <code>number</code> | 最大值 |
| options.star | <code>string</code> | 图标 |
| options.value | <code>number</code> | 默认值 |
| options.activeColor | <code>string</code> | 图标激活的颜色 |
| options.margin | <code>number</code> | 图标外边距 |
| options.fontSize | <code>number</code> | 图标大小 |
| options.disabled | <code>boolean</code> | 禁用点击 |
| options.text | <code>array</code> | 设置提示文字 |
| options.text[].className | <code>string</code> | 提示的类 |
| options.text[].text | <code>string</code> | 提示的文字 |
| options.text[].color | <code>string</code> | 提示的文字颜色 |
| options.defaultTextColor | <code>string</code> | 设置提示的默认文字颜色 |
| options.callback | <code>function</code> | 点击事件的回调函数 |

**Example**  
```html
<import src="../../components/rater/rater.wxml" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Rater</view>
        <view class="page__desc">评分组件</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">Normal Usage</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">set default score = 5</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.star }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">change color</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.changeColor }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">disabled = true</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Your history score</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.history }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Decimal score 3.7</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.decimal }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">custom font-size(15px)</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.custom }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">custom star</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Loving</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.loving }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Sunshine</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.sunshine }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Smilies</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.smilies }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">show text</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Star</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.text1 }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Star</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.text2 }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">Star</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.text3 }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">set callback</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">How embarrass</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.embarrass }}" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">update value</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">Very good</view>
                <view class="weui-cell__ft">
                    <template is="rater" data="{{ ...$wux.rater.good }}" />
                </view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <slider value="{{ slider }}" show-value min="0" max="5" bindchange="sliderChange" />
                </view>
            </view>
        </view>
        <view class="weui-cells__title">repeat</view>
        <view class="weui-cells weui-cells_after-title">
            <block wx:for="{{ items }}" wx:key="">
                <view class="weui-cell">
                    <view class="weui-cell__bd">{{ item.text }}</view>
                    <view class="weui-cell__ft">
                        <template is="rater" data="{{ ...$wux.rater[item.id] }}" />
                    </view>
                </view>
            </block>
        </view>
    </view>
</view>
```

```js
import { $wuxRater } from '../../components/wux'

Page({
    data: {
        items: [{
                id: '001',
                text: 'Face',
                value: 1,
            },
            {
                id: '002',
                text: 'Eye',
                value: 2,
            },
        ],
    },
    onLoad() {
        $wuxRater.init('star', {
            value: 5,
        })

        $wuxRater.init('changeColor', {
            value: 3,
            activeColor: '#04BE02',
        })

        $wuxRater.init('history', {
            value: 3,
            disabled: !0,
        })

        $wuxRater.init('decimal', {
            value: 3.7,
            disabled: !0,
        })

        $wuxRater.init('custom', {
            value: 3,
            fontSize: 15,
            disabled: !0,
        })

        $wuxRater.init('loving', {
            value: 3,
            margin: 15,
            star: '♡',
        })

        $wuxRater.init('sunshine', {
            value: 3,
            margin: 15,
            star: '☼',
        })

        $wuxRater.init('smilies', {
            value: 3,
            margin: 15,
            star: '☻',
        })

        $wuxRater.init('text1', {
            value: 3,
            star: '✩',
            text: ['一星', '二星', '三星', '四星', '五星'],
        })

        $wuxRater.init('text2', {
            value: 3,
            star: '✩',
            text: [1, 2, 3, 4, 5],
            defaultTextColor: '#f5a623',
        })

        $wuxRater.init('text3', {
            value: 3,
            star: '✩',
            text: [{
                    text: '非常差',
                    color: 'red',
                },
                {
                    text: '很差',
                    color: 'red',
                },
                {
                    text: '一般',
                    color: 'blue',
                },
                {
                    text: '很好',
                    color: 'green',
                },
                {
                    text: '非常好',
                    color: 'orange',
                },
            ],
            callback(value, data, text) {
                console.log(value, data, text)
            }
        })

        $wuxRater.init('embarrass', {
            value: 3,
            star: '囧',
            callback(value, data, text) {
                console.log(value, data, text)
            }
        })

        this.good = $wuxRater.init('good', {
            star: '屌',
            callback(value, data, text) {
                this.setData({
                    slider: value
                })
            }
        })

        this.data.items.forEach(n => $wuxRater.init(n.id, {
            value: n.value,
        }))
    },
    sliderChange(e) {
        this.good.update(e.detail.value)
    },
})
```