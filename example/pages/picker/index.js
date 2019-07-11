import data from '../cascader/data'

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
        value1: ['320000', '320800', '320831'],
        value2: [],
        value3: [],
        value4: [],
        asyncCols: 1,
        asyncOptions: provinceLite,
        displayValue1: '请选择',
        displayValue2: '请选择',
        displayValue3: '请选择',
        displayValue4: '请选择',
        options: [],
        seasons,
	},
    onLoad() {
        this.setData({ options: data })
    },
    setValue(values, key) {
        this.setData({
            [`value${key}`]: values.value,
            [`displayValue${key}`]: values.label,
        })
    },
    onConfirm(e) {
        const { index } = e.currentTarget.dataset
        this.setValue(e.detail, index)
        console.log(`onConfirm${index}`, e.detail)
    },
    onValueChange(e) {
        const { index } = e.currentTarget.dataset
        console.log(`onValueChange${index}`, e.detail)
        if (index === '4') {
            this.setValue(e.detail, index)
            this.setData({ loading: true })

            setTimeout(() => {
                const val = e.detail.value
                const d = [...this.data.asyncOptions]
                const value4 = [...val]
                let colNum = 1

                if (val[0] === 'zj') {
                    d.forEach((i) => {
                        if (i.value === 'zj') {
                            colNum = 2
                            if (!i.children) {
                                i.children = [{
                                    value: 'zj-nb',
                                    label: '宁波',
                                }, {
                                    value: 'zj-hz',
                                    label: '杭州',
                                }]
                                value4.push('zj-nb')
                            } else if (val[1] === 'zj-hz') {
                                i.children.forEach((j) => {
                                    if (j.value === 'zj-hz') {
                                        j.children = [{
                                            value: 'zj-hz-xh',
                                            label: '西湖区',
                                        }]
                                        value4.push('zj-hz-xh')
                                    }
                                })
                                colNum = 3
                            }
                        }
                    })
                } else {
                    colNum = 1
                }

                this.setData({ asyncOptions: d, asyncCols: colNum, value4, loading: false })
            }, 300)
        }
    },
    onVisibleChange(e) {
        this.setData({ visible: e.detail.visible })
    },
    onClick() {
        this.setData({ visible: true })
    },
})
