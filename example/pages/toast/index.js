import { $wuxToast } from '../../dist/index'

Page({
    data: {},
    onLoad() {},
    showToast() {
        $wuxToast().show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: '已完成',
            success: () => console.log('已完成')
        })

        // The same as above
        // $wuxToast().success('已完成', {
        //     duration: 1500,
        //     color: '#fff',
        //     success: () => console.log('已完成')
        // })
    },
    showToastCancel() {
        $wuxToast().show({
            type: 'cancel',
            duration: 1500,
            color: '#fff',
            text: '取消操作',
            success: () => console.log('取消操作')
        })

        // The same as above
        // $wuxToast().error('取消操作', {
        //     duration: 1500,
        //     color: '#fff',
        //     success: () => console.log('取消操作')
        // })
    },
    showToastErr() {
        $wuxToast().show({
            type: 'forbidden',
            duration: 1500,
            color: '#fff',
            text: '禁止操作',
            success: () => console.log('禁止操作')
        })

        // The same as above
        // $wuxToast().warning('禁止操作', {
        //     duration: 1500,
        //     color: '#fff',
        //     success: () => console.log('禁止操作')
        // })
    },
    showToastText() {
        $wuxToast().show({
            type: 'text',
            duration: 1500,
            color: '#fff',
            text: '文本提示',
            success: () => console.log('文本提示')
        })

        // The same as above
        // $wuxToast().info('文本提示', {
        //     duration: 1500,
        //     color: '#fff',
        //     success: () => console.log('文本提示')
        // })
    },
    showToastIcon() {
        $wuxToast().show({
            type: 'default',
            duration: 1500,
            color: '#fff',
            icon: 'ios-happy',
            text: '自定义图标',
            success: () => console.log('自定义图标')
        })
    },
    showToastReturn() {
        if (this.timeout) clearTimeout(this.timeout)

        const hide = $wuxToast().show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: '已完成',
        })

        this.timeout = setTimeout(hide, 1000)
    },
    showToastPromie() {
        const hide = $wuxToast().show({
            type: 'success',
            duration: 1500,
            color: '#fff',
            text: '已完成',
        })

        // hide.promise.then(() => console.log('success'))
        hide.then(() => console.log('success'))
    },
})