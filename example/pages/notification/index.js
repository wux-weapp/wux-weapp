import { $wuxNotification } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showNotification() {
        this.closeNotification = $wuxNotification().show({
            image: 'http://pbqg2m54r.bkt.clouddn.com/logo.png',
            title: '宝宝',
            text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
            data: {
                message: '逗你玩的!!!'
            },
            duration: 3000,
            onClick(data) {
                console.log(data)
            },
            onClose(data) {
                console.log(data)
            },
        })
    },
})