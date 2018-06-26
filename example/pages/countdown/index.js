import { $wuxCountDown } from '../../dist/index'

Page({
    data: {},
    onLoad() {
        this.c1 = new $wuxCountDown({
            date: 'June 7, 2087 15:03:25',
            render(date) {
                const years = this.leadingZeros(date.years, 4) + ' 年 '
                const days = this.leadingZeros(date.days, 3) + ' 天 '
                const hours = this.leadingZeros(date.hours, 2) + ' 时 '
                const min = this.leadingZeros(date.min, 2) + ' 分 '
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

                this.setData({
                    c1: years + days + hours + min + sec,
                })
            },
        })

        this.c3 = new $wuxCountDown({
            date: +(new Date) + 60000 * 20,
            render(date) {
                const min = this.leadingZeros(date.min, 2) + ' 分 '
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

                this.setData({
                    c3: min + sec,
                })
            },
        })
    },
    vcode() {
        if (this.c2 && this.c2.interval) return !1
        this.c2 = new $wuxCountDown({
            date: +(new Date) + 60000,
            onEnd() {
                this.setData({
                    c2: '重新获取验证码',
                })
            },
            render(date) {
                const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
                date.sec !== 0 && this.setData({
                    c2: sec,
                })
            },
        })
    },
    stop() {
        this.c3.stop()
    },
    start() {
        this.c3.start()
    },
    update() {
        this.c3.update(+(new Date) + 60000 * 30)
    },
})