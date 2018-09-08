# Grid 宫格

在水平和垂直方向，将布局切分成若干等大的区块。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "Grid",
    "usingComponents": {
        "wux-icon": "../../dist/icon/index",
        "wux-grids": "../../dist/grids/index",
        "wux-grid": "../../dist/grid/index"
    }
}
```

### 示例

```html
<view class="page">
    <view class="page__hd">
        <view class="page__title">Grid</view>
        <view class="page__desc">宫格</view>
    </view>
    <view class="page__bd">
        <view class="sub-title">Default</view>
        <wux-grids>
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
        </wux-grids>
        <view class="sub-title">Square = true</view>
        <wux-grids square>
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
        </wux-grids>
        <view class="sub-title">Bordered = false</view>
        <wux-grids bordered="{{ false }}">
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
        </wux-grids>
        <view class="sub-title">Col = 4</view>
        <wux-grids col="4">
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
            <wux-grid thumb="http://pbqg2m54r.bkt.clouddn.com/logo.png" label="Wux Weapp" />
        </wux-grids>
        <view class="sub-title">Custom content</view>
        <wux-grids>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
            <wux-grid>
                <wux-icon type="logo-github" />
                <view>Wux Weapp</view>
            </wux-grid>
        </wux-grids>
    </view>
</view>
```

## 视频演示

[Grid](./_media/grid.mp4 ':include :type=iframe width=375px height=667px')

## API

### Grids props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| col | <code>string</code> | 列数 | 3 |
| bordered | <code>boolean</code> | 是否有边框 | true |
| square | <code>boolean</code> | 每个格子是否固定为正方形 | false |

### Grid props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| thumb | <code>string</code> | 缩略图 | - |
| label | <code>string</code> | 描述信息 | - |
| bind:click | <code>function</code> | 点击事件 | - |


### Grid slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| header | 自定义缩略图 |