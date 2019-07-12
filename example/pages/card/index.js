Page({
	data: {
		actions: [{
			type: 'default',
			text: '微信支付',
		}, {
			text: '现金支付',
			type: 'primary',
		}],
	},
	onAction(e) {
		console.log('onAction', e.detail)
	},
})