App({
    onLaunch() {
        this.checkAudio()
    },
    checkAudio() {
        wx.getSystemInfo({
            success: (res) => {
                if (res.platform !== 'devtools') {
                    wx.getNetworkType({
                        success: (res) => {
                            if (res.networkType === 'wifi') {
                                this.autoPlay()
                            }
                        }
                    })
                }
            },
        })
    },
    autoPlay() {
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        backgroundAudioManager.title = '小鸡哔哔'
        backgroundAudioManager.epname = '洛天依小鸡哔哔'
        backgroundAudioManager.singer = '洛天依'
        backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000000PKgrQ10ZW56.jpg?max_age=2592000'
        backgroundAudioManager.src = 'http://dl.stream.qqmusic.qq.com/C4000047tXMP3Jdx55.m4a?guid=7365198280&vkey=F9A225C3C442B62DBBFB28FA572299DC3D66758C1E727606B3E9BB2BBE6B92E9FA74183DC3C1F8DD3553FEF153B5BE8AB02E681AF0B223A0&uin=0&fromtag=66'
    },
})
