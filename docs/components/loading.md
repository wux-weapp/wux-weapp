## Loading
指示器

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| options | <code>object</code> | 配置项 | - |
| options.text | <code>string</code> | 提示文本 | 数据加载中 |

**Example**  
```html
<wux-loading id="wux-loading" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">Loading</view>
        <view class="page__desc">指示器</view>
    </view>
    <view class="page__bd">
        <view class="weui-btn-area">
	        <button class="weui-btn" type="default" bindtap="showLoading">加载中提示</button>
        </view>
    </view>
</view>
```

```js
import { $wuxLoading } from '../../dist/base/index'

Page({
    data: {},
    onLoad() {},
    showLoading() {
        this.$wuxLoading = $wuxLoading()
        this.$wuxLoading.show({
            text: '数据加载中',
        })

        setTimeout(() => {
            this.$wuxLoading.hide()
        }, 1500)
    },
})
```