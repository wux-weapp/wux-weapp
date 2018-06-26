## Col
栅格

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| span | <code>number</code> | 栅格占位格数 | 0 |
| pull | <code>number</code> | 栅格向左移动格数 | 0 |
| push | <code>number</code> | 栅格向右移动格数 | 0 |
| offset | <code>number</code> | 栅格左侧的间隔格数 | 0 |

**Example**  
```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Grid</view>
        <view class="page__desc">栅格布局</view>
    </view>
    <view class="page__bd">
        <wux-row>
            <wux-col span="12">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="6">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="6">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" offset="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" push="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
        <wux-row>
            <wux-col span="4">
                <view class="placeholder">wux</view>
            </wux-col>
            <wux-col span="4" offset="4" pull="4">
                <view class="placeholder">wux</view>
            </wux-col>
        </wux-row>
    </view>
</view>
```