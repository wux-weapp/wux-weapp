import { $wuxNotification } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showNotification() {
        this.closeNotification = $wuxNotification().show({
            image: 'http://cdn.skyvow.cn/logo.png',
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
    showNotificationReturn() {
        if (this.timeout) clearTimeout(this.timeout)

        const hide = $wuxNotification().show({
            image: 'http://cdn.skyvow.cn/logo.png',
            title: '宝宝',
            text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
            data: {
                message: '逗你玩的!!!'
            },
            duration: 3000,
        })

        this.timeout = setTimeout(hide, 1000)
    },
    showNotificationPromise() {
        const hide = $wuxNotification().show({
            image: 'http://cdn.skyvow.cn/logo.png',
            title: '宝宝',
            text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
            data: {
                message: '逗你玩的!!!'
            },
            duration: 3000,
        })

        // hide.promise.then(() => console.log('success'))
        hide.then(() => console.log('success'))
    },
})