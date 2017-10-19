import { $wuxXnumber } from '../../components/wux'

Page({
    data: {
        items: [{
                id: '001',
                text: '房间',
                value: 1,
            },
            {
                id: '002',
                text: '成人',
                value: 2,
            },
        ],
    },
    onLoad() {
        $wuxXnumber.init('num1')

        $wuxXnumber.init('num2', {
            callback: (value) => console.log(value),
        })

        $wuxXnumber.init('num3', {
            className: 'custom-xnumber',
        })

        $wuxXnumber.init('num4', {
            step: .5,
        })

        $wuxXnumber.init('num5', {
            min: -5,
            max: 8,
            value: 1,
        })

        $wuxXnumber.init('num6', {
            disabled: !1,
        })

        $wuxXnumber.init('num7', {
            longpress: !0,
        })

        this.data.items.forEach(n => $wuxXnumber.init(n.id, {
            value: n.value,
            callback: (value) => console.log(`已选择${n.text}数量：${value}`),
        }))
    },
})