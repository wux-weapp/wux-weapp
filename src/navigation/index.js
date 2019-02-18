Component({
    properties: {
        title: {
            type: String,
        },
        home: {
            type: String,
            value: __wxConfig.pages[0],
        }
    },
    data: {
        os: wx.getSystemInfoSync().system.indexOf('iOS') > -1 ? 'ios' : 'android',
        iphonex: wx.getSystemInfoSync().model.indexOf('iPhone X') > -1 ? 'iphonex' : '',
        canBack: false,
        canHome: true,
        title: '',
        home: __wxConfig.pages[0],
    },
    ready: function () {
        const pages = getCurrentPages();
        this.setData({
            canBack: pages.length > 1,
            canHome: pages[pages.length - 1].route != this.data.home,
        });
    },
    methods: {
        onTapBack: function () {
            wx.navigateBack();
        },

        onTapHome: function () {
            wx.switchTab({
                url: '/' + this.data.home,
                fail: (e) => {
                    console.log(e);
                },
                success: () => {
                    wx.pageScrollTo({ scrollTop: 0 });
                }
            });
        },
    }
});
