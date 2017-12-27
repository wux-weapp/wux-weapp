## filterbar(options)
筛选栏

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.items | <code>array</code> | 按钮的配置数组 |
| options.onChange | <code>function</code> | 选中值变化的回调函数 |

items 参数说明

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| type | <code>string</code> | 按钮的类型，值为 radio、checkbox、text、sort、filter 其中一个 |
| label | <code>string</code> | 按钮的文本值 |
| value | <code>string</code> | 按钮的属性值 |
| children | <code>array</code> | 需要打开的下拉框元素值，当 type 为 radio、checkbox、filter 其中一个，此属性才会生效 |
| children[].label | <code>string</code> | 子元素的文本值 |
| children[].value | <code>string</code> | 子元素的属性值 |
| children[].type | <code>string</code> | 子元素的类型，当父级 type 为 filter，此属性才会生效，值为 radio、checkbox 其中一个 |
| children[].children | <code>array</code> | 子元素的单选或多项列表，当 children[].type 存在时生效 |
| children[].children[].label | <code>string</code> | 子元素的单选或多项列表元素的文本值，当 children[].type 存在时生效 |
| children[].children[].value | <code>string</code> | 子元素的单选或多项列表元素的属性值，当 children[].type 存在时生效 |
| groups | <code>array</code> | 按钮的分组，若两个或多个按钮的分组存在相同的元素，则按钮可复选，分组唯一则按钮可单选 |

**Example**  
```html
<import src="../../components/filterbar/filterbar.wxml" />

<view class="page">
    <view class="page__hd">
        <view class="page__title">FilterBar</view>
        <view class="page__desc">筛选栏</view>
    </view>
    <view class="page__bd">
        <template is="filterbar" data="{{ ...$wux.filterbar }}" />
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
import { $wuxFilterBar } from '../../components/wux'

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
        this.$wuxFilterBar = $wuxFilterBar.init({
            items: this.data.items,
            onChange: (checkedItems, items) => {
                console.log(this, checkedItems, items)

                const params = {}

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
        })
        this.getRepos()
    },
    getRepos(params = {}) {
        const language = params.language || 'javascript'
        const query = params.query || 'react'
        const q = `${query}+language:${language}`
        const data = Object.assign({
            q,
        }, params)

        this.$wuxFilterBar.onCloseSelect()

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
})
```