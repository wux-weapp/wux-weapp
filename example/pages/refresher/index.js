import { $stopWuxRefresher, $stopWuxLoader } from '../../dist/index'

Page({
    data: {
        items: [],
        count: 10,
        scrollTop: 0,
    },
    onLoad() {
        let item = []
        for (let i = 0; i < this.data.count; i++) {
            let v = {
                title: `项目-${i}`,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
            }
            item.push(v)
        }

        this.setData({
            items: item
        })
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
        this.setData({
            count: 10,
        })
        let item = []
        for (let i = 0; i < this.data.count; i++) {
            let v = {
                title: `项目-${i}`,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
            }
            item.push(v)
        }

        setTimeout(() => {
            this.setData({
                items: item,
            })
            $stopWuxRefresher()
        }, 4000)
    },
    onLoadmore() {
        console.log('onLoadmore')
        let item = []
        for (let i = this.data.count; i < this.data.count + 10; i++) {
            let v = {
                title: `项目-${i}`,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
            }
            item.push(v)
        }
        setTimeout(() => {
            this.setData({
                items: [
                    ...this.data.items,
                    ...item
                ],
                count: this.data.count + 10
            })

            if (this.data.items.length < 30) {
                $stopWuxLoader()
            } else {
                console.log('没有更多数据')
                $stopWuxLoader('#wux-refresher', this, true)
            }

        }, 4000)
    }
})