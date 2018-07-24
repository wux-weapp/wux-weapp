import { $wuxToptips } from '../../dist/index'

Page({
    showToptips1() {
        $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips2() {
        $wuxToptips().success({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips3() {
        $wuxToptips().info({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips4() {
        $wuxToptips().warn({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips5() {
        $wuxToptips().error({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            success() {},
        })
    },
    showToptips6() {
        if (this.timeout) clearTimeout(this.timeout)

        const hide = $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
        })

        this.timeout = setTimeout(hide, 1000)
    },
    showToptips7() {
        const hide = $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
        })

        // hide.promise.then(() => console.log('success'))
        hide.then(() => console.log('success'))
    },
})