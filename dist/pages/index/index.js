Page({
    data: {
        type: `grid`,
        components: [{
                title: 'ActionSheet',
                remark: '上拉菜单',
                url: '/pages/actionsheet/index',
                icon: '../../assets/images/iconfont-actionsheet.png',
            },
            {
                title: 'Backdrop',
                remark: '背景幕',
                url: '/pages/backdrop/index',
                icon: '../../assets/images/iconfont-backdrop.png',
            },
            {
                title: 'Barcode',
                remark: '条形码',
                url: '/pages/barcode/index',
                icon: '../../assets/images/iconfont-barcode.png',
            },
            {
                title: 'Button',
                remark: '浮动按钮',
                url: '/pages/button/index',
                icon: '../../assets/images/iconfont-button.png',
            },
            {
                title: 'Calendar',
                remark: '日历',
                url: '/pages/calendar/index',
                icon: '../../assets/images/iconfont-calendar.png',
            },
            {
                title: 'CountDown',
                remark: '倒计时',
                url: '/pages/countdown/index',
                icon: '../../assets/images/iconfont-countdown.png',
            },
            {
                title: 'CountUp',
                remark: '计数器',
                url: '/pages/countup/index',
                icon: '../../assets/images/iconfont-countup.png',
            },
            {
                title: 'Dialog',
                remark: '对话框',
                url: '/pages/dialog/index',
                icon: '../../assets/images/iconfont-dialog.png',
            },
            {
                title: 'FilterBar',
                remark: '筛选栏',
                url: '/pages/filterbar/index',
                icon: '../../assets/images/iconfont-filterbar.png',
            },
            {
                title: 'Gallery',
                remark: '画廊',
                url: '/pages/gallery/index',
                icon: '../../assets/images/iconfont-gallery.png',
            },
            {
                title: 'Loading',
                remark: '指示器',
                url: '/pages/loading/index',
                icon: '../../assets/images/iconfont-loading.png',
            },
            {
                title: 'Notification',
                remark: '通知',
                url: '/pages/notification/index',
                icon: '../../assets/images/iconfont-notification.png',
            },
            {
                title: 'Picker',
                remark: '选择器',
                url: '/pages/picker/index',
                icon: '../../assets/images/iconfont-picker.png',
            },
            {
                title: 'Prompt',
                remark: '提示消息',
                url: '/pages/prompt/index',
                icon: '../../assets/images/iconfont-prompt.png',
            },
            {
                title: 'Qrcode',
                remark: '二维码',
                url: '/pages/qrcode/index',
                icon: '../../assets/images/iconfont-qrcode.png',
            },
            {
                title: 'Rater',
                remark: '评分',
                url: '/pages/rater/index',
                icon: '../../assets/images/iconfont-rater.png',
            },
            {
                title: 'Refresher',
                remark: '下拉刷新',
                url: '/pages/refresher/index',
                icon: '../../assets/images/iconfont-refresher.png',
            },
            {
                title: 'KeyBoard',
                remark: '键盘',
                url: '/pages/keyboard/index',
                icon: '../../assets/images/iconfont-keyboard.png',
            },
            {
                title: 'Toast',
                remark: '提示框',
                url: '/pages/toast/index',
                icon: '../../assets/images/iconfont-toast.png',
            },
            {
                title: 'Toptips',
                remark: '顶部提示',
                url: '/pages/toptips/index',
                icon: '../../assets/images/iconfont-toptips.png',
            },
            {
                title: 'Xnumber',
                remark: '数字输入框',
                url: '/pages/xnumber/index',
                icon: '../../assets/images/iconfont-xnumber.png',
            },
            {
                title: 'Vcode',
                remark: '验证码',
                url: '/pages/vcode/index',
                icon: '../../assets/images/iconfont-vcode.png',
            },
        ],
    },
    modSwitch(e) {
        this.setData({
            type: e.currentTarget.dataset.type,
        })
    },
})