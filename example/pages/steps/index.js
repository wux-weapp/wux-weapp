Page({
    data: {
        current: 1,
    },
    onClick() {
        const current = this.data.current + 1 > 2 ? 0 : this.data.current + 1

        this.setData({
            current,
        })
    },
})