Page({
    data: {
        right: [{
            text: 'Cancel',
            style: 'background-color: #ddd; color: white',
        },
        {
            text: 'Delete',
            style: 'background-color: #F4333C; color: white',
        }],
        left: [{
            text: 'Reply',
            style: 'background-color: #108ee9; color: white',
        },
        {
            text: 'Cancel',
            style: 'background-color: #ddd; color: white',
        }],
    },
    onClick(e) {
        console.log('onClick', e.detail)
    },
    onShare() {
        console.log('onShare')
    },
    onCellClick() {
        console.log('onCellClick')
    },
})
