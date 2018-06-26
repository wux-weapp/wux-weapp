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
    bindchange(e) {
        console.log(e)
    },
})