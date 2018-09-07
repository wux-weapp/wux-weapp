# FilterBar 筛选栏

筛选栏组件。

## 使用指南

### 在 page.json 中引入组件

```json
{
    "navigationBarTitleText": "FilterBar",
    "usingComponents": {
        "wux-filterbar": "../../dist/filterbar/index"
    }
}
```

### 示例

```html
<view class="page" style="{{ pageStyle }}">
    <view class="page__hd">
        <view class="page__title">FilterBar</view>
        <view class="page__desc">筛选栏</view>
    </view>
    <view class="page__bd">
        <wux-filterbar items="{{ items }}" bind:change="onChange" bind:open="onOpen" bind:close="onClose" />
        <view class="weui-panel weui-panel_access">
            <view class="weui-panel__bd">
                <view class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" wx:for="{{ repos }}" wx:key="">
                    <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                        <image class="weui-media-box__thumb" src="{{ item.owner.avatar_url }}" />
                    </view>
                    <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
                        <view class="weui-media-box__title">{{ item.name }}</view>
                        <view class="weui-media-box__desc">{{ item.description }}</view>
                        <view class="weui-media-box__info">
                            <view class="weui-media-box__info__meta">forks: {{ item.forks_count }}</view>
                            <view class="weui-media-box__info__meta">stars: {{ item.stargazers_count }}</view>
                            <view class="weui-media-box__info__meta">date: {{ item.date }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
```

```js
Page({
    data: {
        items: [{
                type: 'radio',
                label: 'Updated',
                value: 'updated',
                children: [{
                        label: 'Recently updated',
                        value: 'desc',
                    },
                    {
                        label: 'Least recently updated',
                        value: 'asc',
                    },
                ],
                groups: ['001'],
            },
            {
                type: 'text',
                label: 'Forks',
                value: 'forks',
                groups: ['002'],
            },
            {
                type: 'sort',
                label: 'Stars',
                value: 'stars',
                groups: ['003'],
            },
            {
                type: 'filter',
                label: '筛选',
                value: 'filter',
                children: [{
                        type: 'radio',
                        label: 'Languages（单选）',
                        value: 'language',
                        children: [{
                                label: 'JavaScript',
                                value: 'javascript',
                            },
                            {
                                label: 'HTML',
                                value: 'html',
                            },
                            {
                                label: 'CSS',
                                value: 'css',
                            },
                            {
                                label: 'TypeScript',
                                value: 'typescript',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: 'Query（复选）',
                        value: 'query',
                        children: [{
                                label: 'Angular',
                                value: 'angular',
                            },
                            {
                                label: 'Vue',
                                value: 'vue',
                            },
                            {
                                label: 'React',
                                value: 'react',
                            },
                            {
                                label: 'Avalon',
                                value: 'avalon',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: '配送方式',
                        value: 'away',
                        children: [{
                                label: '京东配送',
                                value: '1',
                            },
                            {
                                label: '货到付款',
                                value: '2',
                            },
                            {
                                label: '仅看有货',
                                value: '3',
                            },
                            {
                                label: '促销',
                                value: '4',
                            },
                            {
                                label: '全球购',
                                value: '5',
                            },
                            {
                                label: 'PLUS专享价',
                                value: '6',
                            },
                            {
                                label: '新品',
                                value: '7',
                            },
                            {
                                label: '配送全球',
                                value: '8',
                            },
                        ],
                    },
                    {
                        type: 'radio',
                        label: '性别',
                        value: 'gander',
                        children: [{
                                label: '男',
                                value: '0',
                            },
                            {
                                label: '女',
                                value: '1',
                            },
                            {
                                label: '通用',
                                value: '2',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: '闭合方式',
                        value: 'closed_mode',
                        children: [{
                                label: '卡扣',
                                value: '0',
                            },
                            {
                                label: '拉链',
                                value: '1',
                            },
                            {
                                label: '其他',
                                value: '2',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: '轮子种类',
                        value: 'wheel_type',
                        children: [{
                                label: '万向轮',
                                value: '0',
                            },
                            {
                                label: '单向轮',
                                value: '1',
                            },
                            {
                                label: '飞机轮',
                                value: '2',
                            },
                            {
                                label: '其他',
                                value: '3',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: '箱包硬度',
                        value: 'wheel_type',
                        children: [{
                                label: '硬箱',
                                value: '0',
                            },
                            {
                                label: '软硬结合',
                                value: '1',
                            },
                            {
                                label: '软箱',
                                value: '2',
                            },
                            {
                                label: '其他',
                                value: '3',
                            },
                        ],
                    },
                    {
                        type: 'checkbox',
                        label: '适用场景',
                        value: 'wheel_type',
                        children: [{
                                label: '旅行',
                                value: '0',
                            },
                            {
                                label: '婚庆',
                                value: '1',
                            },
                            {
                                label: '出差',
                                value: '2',
                            },
                            {
                                label: '其他',
                                value: '3',
                            },
                        ],
                    },
                ],
                groups: ['001', '002', '003'],
            },
        ],
    },
    onLoad() {
        this.getRepos()
    },
    onChange(e) {
        const { checkedItems, items } = e.detail
        const params = {}

        console.log(checkedItems, items)

        checkedItems.forEach((n) => {
            if (n.checked) {
                if (n.value === 'updated') {
                    const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                    params.sort = n.value
                    params.order = selected
                } else if (n.value === 'stars') {
                    params.sort = n.value
                    params.order = n.sort === 1 ? 'asc' : 'desc'
                } else if (n.value === 'forks') {
                    params.sort = n.value
                } else if (n.value === 'filter') {
                    n.children.filter((n) => n.selected).forEach((n) => {
                        if (n.value === 'language') {
                            const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                            params.language = selected
                        } else if (n.value === 'query') {
                            const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                            params.query = selected
                        }
                    })
                }
            }
        })

        this.getRepos(params)
    },
    getRepos(params = {}) {
        const language = params.language || 'javascript'
        const query = params.query || 'react'
        const q = `${query}+language:${language}`
        const data = Object.assign({
            q,
        }, params)

        wx.showLoading()
        wx.request({
            url: `https://api.github.com/search/repositories`,
            data,
            success: (res) => {
                console.log(res)

                wx.hideLoading()

                this.setData({
                    repos: res.data.items.map((n) => Object.assign({}, n, {
                        date: n.created_at.substr(0, 7),
                    })),
                })
            },
        })
    },
    onOpen(e) {
        this.setData({
            pageStyle: 'height: 100%; overflow: hidden',
        })
    },
    onClose(e) {
        this.setData({
            pageStyle: '',
        })
    },
})
```

## 视频演示

[FilterBar](./_media/filterbar.mp4 ':include :type=iframe width=375px height=667px')

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| items | <code>array</code> | 组件子元素 | [] |
| items[].type | <code>string</code> | 子元素类型，可选值为：radio、text、checkbox、sort、filter | - |
| items[].label | <code>string</code> | 描述 | - |
| items[].value | <code>string</code> | 唯一值 | - |
| items[].children | <code>array</code> | 子元素 | [] |
| items[].groups | <code>array</code> | 所属分组 | [] |
| bind:change | <code>function</code> | change 事件触发的回调函数 | - |
| bind:scroll | <code>function</code> | scroll 事件触发的回调函数 | - |
| bind:open | <code>function</code> | 打开 select 或 filter 时触发的回调函数 | - |
| bind:close | <code>function</code> | 关闭 select 或 filter 时触发的回调函数 | - |