import ad from '../index/ad'

ad({
    data: {
        activeKey: '0',
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
    onChange(e) {
        console.log('onChange', e)
        this.setData({
            activeKey: e.detail.key,
        })
    },
    buttonClicked(e) {
        console.log('buttonClicked', e)
    },
    onGotUserInfo(e) {
        console.log('onGotUserInfo', e)
    },
})
