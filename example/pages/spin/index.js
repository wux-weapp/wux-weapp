import ad from '../index/ad'

ad({
    onClick(e) {
        this.setData({
            spinning: !this.data.spinning,
        })
    },
})
