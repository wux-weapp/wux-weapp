import { icons, logos } from './data'

Page({
    data: {
        selected: 'ios',
        icons,
        logos,
    },
    onSelect(e) {
        this.setData({
            selected: e.currentTarget.dataset.style,
        })
    },
})