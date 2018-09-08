# Upload 上传

用于文件选择或相机拍照上传。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Upload",
    "usingComponents": {
        "wux-upload": "../../dist/upload/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Upload</view>
        <view class="page__desc">上传</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <view class="sub-title">Default</view>
        <wux-upload url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete">
            <button type="default">Click to Upload</button>
        </wux-upload>
        <view class="sub-title">Disabled</view>
        <wux-upload disabled url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete">
            <button disabled type="default">Click to Upload</button>
        </wux-upload>
        <view class="sub-title">Picture card</view>
        <wux-upload list-type="picture-card" file-list="{{ fileList }}" url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete" bind:preview="onPreview">
            <text>Upload</text>
        </wux-upload>
        <view class="sub-title">ShowUploadList = false</view>
        <wux-upload list-type="picture-card" show-upload-list="{{ false }}" url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete" bind:preview="onPreview">
            <image src="{{ imageUrl }}" wx:if="{{ imageUrl }}" />
            <text wx:else>Upload</text>
        </wux-upload>
        <view class="sub-title">Progress = true</view>
        <progress percent="{{ progress }}" show-info />
        <wux-upload progress list-type="picture-card" show-upload-list="{{ false }}" url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete" bind:progress="onProgress" bind:preview="onPreview">
            <image src="{{ imageUrl }}" wx:if="{{ imageUrl }}" />
            <text wx:else>Upload</text>
        </wux-upload>
        <view class="sub-title">Remove</view>
        <wux-upload list-type="picture-card" file-list="{{ fileList }}" url="https://www.skyvow.cn/api/common/file" bind:change="onChange" bind:success="onSuccess" bind:fail="onFail" bind:complete="onComplete" bind:preview="onRemove">
            <text>Upload</text>
        </wux-upload>
    </view>
</view>
```

```js
Page({
    data: {
        fileList: [{
                uid: 0,
                status: 'uploading',
                url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
            },
            {
                uid: 1,
                status: 'done',
                url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
            },
            {
                uid: 2,
                status: 'error',
                url: 'http://pbqg2m54r.bkt.clouddn.com/qrcode.jpg',
            }
        ],
    },
    onChange(e) {
        console.log('onChange', e)
        const { file } = e.detail
        if (file.status === 'uploading') {
            this.setData({
                progress: 0,
            })
            wx.showLoading()
        } else if (file.status === 'done') {
            this.setData({
                imageUrl: file.url,
            })
        }
    },
    onSuccess(e) {
        console.log('onSuccess', e)
    },
    onFail(e) {
        console.log('onFail', e)
    },
    onComplete(e) {
        console.log('onComplete', e)
        wx.hideLoading()
    },
    onProgress(e) {
        console.log('onProgress', e)
        this.setData({
            progress: e.detail.file.progress,
        })
    },
    onPreview(e) {
        console.log('onPreview', e)
        const { file, fileList } = e.detail
        wx.previewImage({
            current: file.url,
            urls: fileList.map((n) => n.url),
        })
    },
    onRemove(e) {
        const { file, fileList } = e.detail
        wx.showModal({
            content: '确定删除？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        fileList: fileList.filter((n) => n.uid !== file.uid),
                    })
                }
            },
        })
    },
})
```

## 视频演示

[Upload](./_media/upload.mp4 ':include :type=iframe width=375px height=667px')

## API

### Upload props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| count | <code>number</code> | 最多可以选择的图片张数 | 9 |
| sizeType | <code>array</code> | original 原图，compressed 压缩图 | ['original', 'compressed'] |
| sourceType | <code>array</code> | album 从相册选图，camera 使用相机 | ['album', 'camera'] |
| url | <code>string</code> | 上传地址 | - |
| name | <code>string</code> | 文件对应的 key | file |
| header | <code>object</code> | HTTP 请求 Header, header 中不能设置 Referer | {} |
| formData | <code>object</code> | HTTP 请求中其他额外的 form data | {} |
| uploaded | <code>boolean</code> | 默认的上传行为 | true |
| disabled | <code>boolean</code> | 是否禁用 | false |
| progress | <code>boolean</code> | 是否监听上传进度变化 | false |
| listType | <code>string</code> | 上传列表的内建样式，可选值为 text、picture-card | text |
| fileList | <code>array</code> | 已经上传的文件列表 | [] |
| showUploadList | <code>boolean</code> | 是否展示上传文件列表 | true |
| showRemoveIcon | <code>boolean</code> | 是否展示删除图标 | true |
| bind:before | <code>function</code> | 上传文件之前的回调函数 | - |
| bind:change | <code>function</code> | 上传文件改变时的回调函数 | - |
| bind:success | <code>function</code> | 上传文件成功时的回调函数 | - |
| bind:fail | <code>function</code> | 上传文件失败时的回调函数 | - |
| bind:complete | <code>function</code> | 上传文件完成时的回调函数 | - |
| bind:progress | <code>function</code> | 监听上传进度变化的回调函数 | - |
| bind:preview | <code>function</code> | 点击文件时的回调函数 | - |
| bind:remove | <code>function</code> | 点击删除图标时的回调函数 | - |

### Upload slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |