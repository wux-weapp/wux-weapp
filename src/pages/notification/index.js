import { $wuxNotification } from '../../components/wux'

Page({
	data: {},
	onLoad() {},
	showNotification() {
		this.closeNotification = $wuxNotification.show({
			image: 'http://light7.org/assets/img/i-wechat.png', 
			title: '宝宝', 
			text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!', 
			data: {
				message: '逗你玩的!!!'
			}, 
			time: 3000, 
			onClick(data) {
				console.log(data)
			},
			onClose(data) {
				console.log(data)
			},
		})
	},
})