const sliderWidth = 96

Page({
    data: {
        tabs: ['全部', '待收货', '待评价'],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        msg1: {
            title: '空空如也',
            text: '暂时没有相关数据',
        },
        msg2: {
            icon: '../../assets/images/iconfont-order.png',
            title: '您还没有相关的订单',
            text: '可以去看看有哪些想买',
            buttons: [{
                text: '随便逛逛',
            }],
        },
        msg3: {
            icon: 'http://cdn.skyvow.cn/logo.png',
            title: '授权失败',
            text: '获取用户信息失败，请重新授权',
            buttons: [{
                text: '重新授权',
                openType: 'getUserInfo',
            }],
        },
    },
    onLoad() {
        this.getSystemInfo()
    },
    getSystemInfo() {
        const that = this
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                })
            }
        })
    },
    tabClick(e) {
        const { offsetLeft, dataset } = e.currentTarget
        const { id } = dataset

        this.setData({
            sliderOffset: offsetLeft,
            activeIndex: id,
        })
    },
    buttonClicked(e) {
        console.log('buttonClicked', e)
    },
    onGotUserInfo(e) {
        console.log('onGotUserInfo', e)
    },
})