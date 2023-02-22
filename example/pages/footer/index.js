import ad from '../index/ad'

const links = [
    {
        text: '首页',
        url: '/pages/index/index',
        openType: 'switchTab',
    },
    {
        text: '关于',
        url: '/pages/about/index',
        openType: 'switchTab',
    },
]

const chips = [
    {
        text: '组件化',
        type: 'link',
    },
    {
        text: '可复用',
        type: 'link',
    },
    {
        text: '易扩展',
        type: 'link',
    },
]

ad({
    data: {
        links,
        linksNoLinkData: links.map((v) => ({ text: v.text })),
        chips,
        chipsNoLinkData: chips.map((v) => ({ text: v.text })),
    },
    onLinkClick(e) {
        console.log('onLinkClick', e.detail)
        wx.showModal({
            title: `跳转到"${e.detail.item.text}"`,
            showCancel: !1,
        })
    },
    onChipClick(e) {
        console.log('onChipClick', e.detail)
        wx.showModal({
            title: `"${e.detail.item.text}"被点击了`,
            showCancel: !1,
        })
    },
})
