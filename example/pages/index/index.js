Page({
    data: {
        components: [{
                title: '核心组件',
                children: [{
                    title: 'AnimationGroup',
                    remark: '动画组',
                    url: '/pages/animation-group/index',
                }],
            },
            {
                title: '布局组件',
                children: [{
                        title: 'Grid',
                        remark: '栅格布局',
                        url: '/pages/grid/index',
                    },
                    {
                        title: 'WhiteSpace',
                        remark: '上下留白',
                        url: '/pages/white-space/index',
                    },
                    {
                        title: 'WingBlank',
                        remark: '两翼留白',
                        url: '/pages/wing-blank/index',
                    },
                ],
            },
            {
                title: '数据录入',
                children: [{
                        title: 'Checkbox',
                        remark: '复选框',
                        url: '/pages/checkbox/index',
                    },
                    {
                        title: 'InputNumber',
                        remark: '数字输入框',
                        url: '/pages/input-number/index',
                    },
                    {
                        title: 'Radio',
                        remark: '单选框',
                        url: '/pages/radio/index',
                    },
                    {
                        title: 'Rater',
                        remark: '评分',
                        url: '/pages/rater/index',
                    },
                    {
                        title: 'Switch',
                        remark: '滑动开关',
                        url: '/pages/switch/index',
                    },
                ],
            },
            {
                title: '数据展示',
                children: [{
                        title: 'Badge',
                        remark: '徽章',
                        url: '/pages/badge/index',
                    },
                    {
                        title: 'Barcode',
                        remark: '条形码',
                        url: '/pages/barcode/index',
                    },
                    {
                        title: 'Card',
                        remark: '卡片',
                        url: '/pages/card/index',
                    },
                    {
                        title: 'CountDown',
                        remark: '倒计时',
                        url: '/pages/countdown/index',
                    },
                    {
                        title: 'CountUp',
                        remark: '计数器',
                        url: '/pages/countup/index',
                    },
                    {
                        title: 'FloatingButton',
                        remark: '浮动按钮',
                        url: '/pages/floating-button/index',
                    },
                    {
                        title: 'List',
                        remark: '列表',
                        url: '/pages/list/index',
                    },
                    {
                        title: 'Media',
                        remark: '媒体对象',
                        url: '/pages/media/index',
                    },
                    {
                        title: 'Prompt',
                        remark: '提示消息',
                        url: '/pages/prompt/index',
                    },
                    {
                        title: 'Qrcode',
                        remark: '二维码',
                        url: '/pages/qrcode/index',
                    },
                    {
                        title: 'Tag',
                        remark: '标签',
                        url: '/pages/tag/index',
                    },
                    {
                        title: 'Vcode',
                        remark: '验证码',
                        url: '/pages/vcode/index',
                    },
                ],
            },
            {
                title: '操作反馈',
                children: [{
                        title: 'ActionSheet',
                        remark: '上拉菜单',
                        url: '/pages/actionsheet/index',
                    },
                    {
                        title: 'Backdrop',
                        remark: '背景幕',
                        url: '/pages/backdrop/index',
                    },
                    {
                        title: 'Dialog',
                        remark: '对话框',
                        url: '/pages/dialog/index',
                    },
                    {
                        title: 'Gallery',
                        remark: '画廊',
                        url: '/pages/gallery/index',
                    },
                    {
                        title: 'Loading',
                        remark: '指示器',
                        url: '/pages/loading/index',
                    },
                    {
                        title: 'Notification',
                        remark: '通知',
                        url: '/pages/notification/index',
                    },
                    {
                        title: 'Spin',
                        remark: '加载中',
                        url: '/pages/spin/index',
                    },
                    {
                        title: 'Toast',
                        remark: '提示框',
                        url: '/pages/toast/index',
                    },
                    {
                        title: 'Toptips',
                        remark: '顶部提示',
                        url: '/pages/toptips/index',
                    },
                ],
            },
            {
                title: '拓展组件',
                children: [{
                        title: 'KeyBoard',
                        remark: '数字键盘',
                        url: '/pages/keyboard/index',
                    },
                    {
                        title: 'Refresher',
                        remark: '下拉刷新',
                        url: '/pages/refresher/index',
                    },
                ],
            },
        ],
    },
    onShareAppMessage() {
        return {
            title: 'Wux Weapp',
        }
    },
})