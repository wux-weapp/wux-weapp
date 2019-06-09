import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '../../dist/index'

const getList = (count = 10, step = 0) => [...new Array(count)].map((n, i) => ({ title: `Pull down ${i + step}`, content: 'Wux Weapp' }))

Page({
    data: {
        items: [],
        count: 0,
        scrollTop: 0,
    },
    onLoad() {
        $startWuxRefresher()
    },
    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop
        })
    },
    onPulling() {
        console.log('onPulling')
    },
    onRefresh() {
        console.log('onRefresh')

        this.setData({ count: 10 })

        setTimeout(() => {
            this.setData({ items: getList() })
            $stopWuxRefresher()
        }, 3000)
    },
    onLoadmore() {
        console.log('onLoadmore')
        setTimeout(() => {
            this.setData({
                items: [...this.data.items, ...getList(10, this.data.count)],
                count: this.data.count + 10,
            })

            if (this.data.items.length < 30) {
                $stopWuxLoader()
            } else {
                console.log('没有更多数据')
                $stopWuxLoader('#wux-refresher', this, true)
            }
        }, 3000)
    }
})
