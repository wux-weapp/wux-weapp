import { $stopWuxRefresher } from '../../dist/index'

Page({
    data: {
        items: [{
                title: new Date,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            },
            {
                title: new Date,
                content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            }
        ]
    },
    onLoad() {},
    onPulling() {
        console.log('onPulling')
    },
    onRefresh() {
        console.log('onRefresh')
        setTimeout(() => {
            this.setData({
                items: [{
                    title: new Date,
                    content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                }, ...this.data.items],
            })

            $stopWuxRefresher()
        }, 2000)
    },
})