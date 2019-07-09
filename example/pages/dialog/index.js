import { $wuxDialog } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    open() {
        if (this.timeout) clearTimeout(this.timeout)

        const hideDialog = $wuxDialog().open({
            resetOnClose: true,
            title: '三秒后自动关闭',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            buttons: [{
                    text: '取消',
                },
                {
                    text: '确定',
                    type: 'primary',
                    onTap(e) {
                        console.log(e)
                    },
                },
            ],
        })

        this.timeout = setTimeout(hideDialog, 3000)
    },
    confirm() {
        $wuxDialog().confirm({
            resetOnClose: true,
            closable: true,
            title: '定制冰激凌',
            content: '你确定要吃我的冰淇淋吗？',
            onConfirm(e) {
                console.log('凭什么吃我的冰淇淋！')
            },
            onCancel(e) {
                console.log('谢谢你不吃之恩！')
            },
        })
    },
    alert() {
        $wuxDialog().alert({
            resetOnClose: true,
            title: '不要吃果冻',
            content: '它们可能是用旧的皮鞋帮做的！',
            onConfirm(e) {
                console.log('感谢上帝，你没吃鞋帮！')
            },
        })
    },
    prompt() {
        const alert = (content) => {
            $wuxDialog('#wux-dialog--alert').alert({
                resetOnClose: true,
                title: '提示',
                content: content,
            })
        }

        $wuxDialog().prompt({
            resetOnClose: true,
            title: '提示',
            content: '密码为8位数字',
            fieldtype: 'number',
            password: !0,
            defaultText: '',
            placeholder: '请输入Wi-Fi密码',
            maxlength: 8,
            onConfirm(e, response) {
                const content = response.length === 8 ? `Wi-Fi密码到手了: ${response}` : `请输入正确的Wi-Fi密码`
                alert(content)
            },
        })
    },
    custom() {
        const alert = (content) => {
            $wuxDialog('#wux-dialog--alert').alert({
                resetOnClose: true,
                title: '提示',
                content: content,
            })
        }

        $wuxDialog().open({
            resetOnClose: true,
            title: '我是标题',
            content: '我是自定义的对话框！',
            buttons: [{
                    text: '现金支付',
                    type: 'primary',
                    onTap(e) {
                        alert('你选择了现金支付！')
                    },
                },
                {
                    text: '微信支付',
                    type: 'primary',
                    onTap(e) {
                        alert('你选择了微信支付！')
                    },
                },
                {
                    text: '取消',
                },
            ],
        })
    },
    vertical() {
        $wuxDialog().open({
            resetOnClose: true,
            title: '请问需要反馈什么问题？',
            content: '你也可以在个人页的反馈帮助中心里找到这个功能',
            verticalButtons: !0,
            buttons: [{
                    text: '遇到问题',
                    bold: !0,
                },
                {
                    text: '意见建议',
                    bold: !0,
                },
                {
                    text: '没啥事',
                    bold: !0,
                },
            ],
        })
    },
    openType() {
        $wuxDialog().open({
            resetOnClose: true,
            title: '提示',
            content: '获取用户信息',
            buttons: [{
                    text: '取消',
                },
                {
                    text: '确定',
                    type: 'primary',
                    openType: 'getUserInfo',
                    onGetUserInfo(e) {
                        console.log(e)
                    },
                },
            ],
        })
    },
})