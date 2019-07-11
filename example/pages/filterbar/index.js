Page({
    data: {
        items: [{
                type: 'radio',
                label: 'Updated',
                value: 'updated',
                checked: true,
                children: [{
                        label: 'Recently updated',
                        value: 'desc',
                        checked: true, // 默认选中
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
                checked: true,
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
                                checked: true, // 默认选中
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
        const { checkedItems, items, checkedValues } = e.detail
        const params = {}

        console.log(checkedItems, items, checkedValues)

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
        
        console.log('params', params)

        this.getRepos(params)
    },
    getRepos(params = {}) {
        const language = params.language || 'javascript'
        const query = params.query || 'react'
        const q = `${query}+language:${language}`
        const data = Object.assign({
            q,
            order: 'desc',
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
        this.setData({ opened: true })
    },
    onClose(e) {
        this.setData({ opened: false })
    },
    /**
     * 阻止触摸移动
     */
    noop() {},
})