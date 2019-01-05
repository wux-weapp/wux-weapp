Page({
	data: {
		to: null,
		lang: 'zh_CN',
	},
    onLoad() {
        this.setData({
            to: new Date().getTime(),
        })
    },
    onChange(e) {
        console.log(e)
        const { key, values } = e.detail
        const lang = values[key]

        this.setData({
        	lang,
        })
    },
})
