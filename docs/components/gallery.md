## gallery(options)
画廊

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.current | <code>number</code> | 当前显示图片的索引值 |
| options.urls | <code>array</code> | 需要预览的图片链接列表 |
| options.delete | <code>function</code> | 点击删除的回调函数 |
| options.cancel | <code>function</code> | 点击关闭的回调函数 |

**Example**  
```html
<import src="../../components/gallery/gallery.wxml"/>

<template is="gallery" data="{{ ...$wux.gallery }}"/>

<view class="page">
    <view class="page__hd">
        <view class="page__title">Gallery</view>
        <view class="page__desc">画廊</view>
    </view>
    <view class="page__bd">
        <view class="weui-cells__title">基于小程序原生的wx.previewImage</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <view class="weui-uploader">
                        <view class="weui-uploader__bd">
                            <view class="weui-uploader__files">
                                <block wx:for-items="{{ urls }}" wx:key="{{ index }}">
                                    <view class="weui-uploader__file" bindtap="previewImage" data-current="{{ item }}">
                                        <image class="weui-uploader__img" src="{{ item }}" />
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="weui-cells__title">自定义gallery</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <view class="weui-uploader">
                        <view class="weui-uploader__bd">
                            <view class="weui-uploader__files">
                                <block wx:for-items="{{ urls }}" wx:key="{{ index }}">
                                    <view class="weui-uploader__file" bindtap="showGallery" data-current="{{ index }}">
                                        <image class="weui-uploader__img" src="{{ item }}" />
                                    </view>
                                </block>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
const App = getApp()

Page({
    data: {
        urls: [
            'https://unsplash.it/200/200', 
            'https://unsplash.it/300/300', 
            'https://unsplash.it/400/400', 
            'https://unsplash.it/600/600', 
            'https://unsplash.it/800/800', 
            'https://unsplash.it/900/900', 
            'https://unsplash.it/1000/1000', 
            'https://unsplash.it/1200/1200', 
        ],
    },
    onLoad() {
        this.$wuxGallery = App.Wux().$wuxGallery
    },
    showGallery(e) {
        const that = this
        const dataset = e.currentTarget.dataset
        const current = dataset.current
        const urls = this.data.urls

        this.$wuxGallery.show({
            current: current, 
            urls: urls, 
            delete: (current, urls) => {
                urls.splice(current, 1)
                that.setData({
                    urls: urls, 
                })
                return !0
            },
            cancel: () => console.log('Close gallery')
        })
    },
    previewImage(e) {
        const dataset = e.currentTarget.dataset
        const current = dataset.current
        const urls = this.data.urls

        wx.previewImage({
            current: current, 
            urls: urls, 
        })
    },
})
```