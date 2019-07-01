const seasons = [
    ['王', '马', '蔡'],
    ['撕葱', '粑粑', '🏀'],
]

const provinceLite = [{
    value: 'bj',
    label: '北京市',
}, {
    value: 'zj',
    label: '浙江省',
}, {
    value: 'gd',
    label: '广东省',
    disabled: true,
}, {
    value: 'hn',
    label: '海南省',
}, {
    value: 'cq',
    label: '重庆市',
}, {
    value: 'sc',
    label: '四川省',
}]

Page({
	data: {
        value: [2, 2],
        options: seasons,
	},
    onChange(e) {
        this.setData({ value: e.detail.value })
        console.log('onChange', e.detail)
    },
})
