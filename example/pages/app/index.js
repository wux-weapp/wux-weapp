import ad from '../index/ad'

ad({
    onLoad() {
        const App = this.selectComponent('#wux-app')
        const { dialog, loading, notification, toast, toptips } = App.useApp()
       
        this.showDialog = () => dialog.alert({
            title: 'This is a warning message',
            content: 'some messages...some messages...some messages...',
            confirmText: 'ok',
        })

        this.showLoading = () => {
            loading.show({
                text: 'Loading...',
            })
            setTimeout(() => {
                loading.hide()
            }, 3000)
        }

        this.showNotification = () => notification.show({
            image: 'http://cdn.skyvow.cn/logo.png',
            title: 'Notification Title',
            text: 'This is the content of the notification.',
        })

        this.showToast = () => toast.success({
            text: 'Success!',
        })

        this.showToptips = () => toptips.info({
            text: 'This is a tip at the top',
        })
    },
})
