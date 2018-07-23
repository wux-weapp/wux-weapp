import { $wuxToptips } from '../../dist/index'

Page({
    showToptips1() {
        $wuxToptips().show({
            icon: 'cancel',
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            className: '',
            success() {},
        })
    },
    showToptips2() {
        $wuxToptips().success({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            className: '',
            success() {},
        })
    },
    showToptips3() {
        $wuxToptips().info({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            className: '',
            success() {},
        })
    },
    showToptips4() {
        $wuxToptips().warn({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            className: '',
            success() {},
        })
    },
    showToptips5() {
        $wuxToptips().error({
            hidden: false,
            text: 'Toptips Title',
            duration: 3000,
            className: '',
            success() {},
        })
    },
})