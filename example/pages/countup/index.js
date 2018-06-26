import { $wuxCountUp } from '../../dist/index'

Page({
    data: {},
    onLoad() {
        this.c1 = new $wuxCountUp(1, 1024, 0, 2, {
            printValue(value) {
                this.setData({
                    c1: value,
                })
            }
        })

        this.c2 = new $wuxCountUp(0, 88.88, 2, 2, {
            printValue(value) {
                this.setData({
                    c2: value,
                })
            }
        })

        this.c3 = new $wuxCountUp(0, 520, 0, 2, {
            printValue(value) {
                this.setData({
                    c3: value,
                })
            }
        })

        this.c1.start()
        this.c2.start()
    },
    start() {
        this.c3.start(() => {
            wx.showToast({
                title: '已完成',
            })
        })
    },
    reset() {
        this.c3.reset()
    },
    update() {
        this.c3.update(1314)
    },
    pauseResume() {
        this.c3.pauseResume()
    },
})