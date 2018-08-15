import { icons, logos } from './data'

Page({
    data: {
        style: 'ios',
        icons,
        logos,
    },
    onChange(e) {
        const style = e.detail.key === 0 ? 'ios' : 'md'

        this.setData({
            style,
        })
    },
})