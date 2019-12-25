import { icons, logos } from './data'

import ad from '../index/ad'

ad({
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
