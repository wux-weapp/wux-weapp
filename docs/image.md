# Image 图片

图片。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Image",
    "usingComponents": {
        "wux-row": "../../dist/row/index",
        "wux-col": "../../dist/col/index",
        "wux-image": "../../dist/image/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Image</view>
        <view class="page__desc">图片</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Shape</view>
        <wux-row>
            <wux-col span="4">
                <wux-image wux-class="image" shape="rounded" src="https://picsum.photos/750/750/?random&s=1" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" shape="circle" src="https://picsum.photos/750/750/?random&s=2" loading="Loading" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" shape="thumbnail" src="https://picsum.photos/750/750/?random&s=3">
                    <image src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.svg" slot="loading" />
                </wux-image>
            </wux-col>
        </wux-row>
        <view class="sub-title">Loading</view>
        <wux-row>
            <wux-col span="4">
                <wux-image wux-class="image" src="https://picsum.photos/750/750/?random&s=4" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="https://picsum.photos/750/750/?random&s=5" loading="Loading" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="https://picsum.photos/750/750/?random&s=6">
                    <image src="https://loading.io/spinners/spinner/index.ajax-spinner-preloader.svg" slot="loading" />
                </wux-image>
            </wux-col>
        </wux-row>
        <view class="sub-title">Empty</view>
        <wux-row>
            <wux-col span="4">
                <wux-image wux-class="image" src="" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="" empty="Empty" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="">
                    <image src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" slot="empty" />
                </wux-image>
            </wux-col>
        </wux-row>
        <view class="sub-title">Error</view>
        <wux-row>
            <wux-col span="4">
                <wux-image wux-class="image" src="error" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="error" error="Error" />
            </wux-col>
            <wux-col span="4">
                <wux-image wux-class="image" src="error">
                    <image src="http://pbqg2m54r.bkt.clouddn.com/logo.png" slot="error" />
                </wux-image>
            </wux-col>
        </wux-row>
    </view>
</view>
```

## 视频演示

[Image](./_media/image.mp4 ':include :type=iframe width=375px height=667px')

## API

### Image props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| src | <code>string</code> | 图片资源地址 | - |
| mode | <code>string</code> | 图片裁剪、缩放的模式，可参考 [image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html) | scaleToFill |
| lazyLoad | <code>boolean</code> | 图片懒加载。只针对 page 与 scroll-view 下的 image 有效 | false |
| shape | <code>string</code> | 形状，可选值为 normal、rounded、circle、thumbnail | normal |
| width | <code>any</code> | 默认宽度，单位 px | 300 |
| height | <code>any</code> | 默认高度，单位 px | 225 |
| unmountOnEmpty | <code>boolean</code> | 资源不存在时是否卸载组件 | false |
| unmountOnError | <code>boolean</code> | 资源加载失败时是否卸载组件 | false |
| empty | <code>string</code> | 资源不存在的提示内容 | - |
| loading | <code>string</code> | 资源加载中的提示内容 | - |
| error | <code>string</code> | 资源加载失败的提示内容 | - |
| bind:change | <code>function</code> | 监听状态变化的回调函数 | - |
| bind:load | <code>function</code> | 资源加载完成时的回调函数 | - |
| bind:error | <code>function</code> | 资源加载失败时的回调函数 | - |
| bind:click | <code>function</code> | 点击事件 | - |

### Image slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| empty | 自定义资源不存在的提示内容 |
| loading | 自定义资源加载中的提示内容 |
| error | 自定义资源加载失败的提示内容 |