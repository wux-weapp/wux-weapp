import { $wuxRater } from '../../components/wux'

Page({
	data: {},
	onLoad() {
		$wuxRater.init('star', {
			value: 5, 
		})

		$wuxRater.init('changeColor', {
			value: 3, 
			activeColor: '#04BE02', 
		})

		$wuxRater.init('history', {
			value: 3, 
			disabled: !0, 
		})

		$wuxRater.init('decimal', {
			value: 3.7, 
			disabled: !0, 
		})

		$wuxRater.init('custom', {
			value: 3, 
			fontSize: 15, 
			disabled: !0, 
		})

		$wuxRater.init('loving', {
			value: 3, 
			margin: 15, 
			star: '♡', 
		})

		$wuxRater.init('sunshine', {
			value: 3, 
			margin: 15, 
			star: '☼', 
		})

		$wuxRater.init('smilies', {
			value: 3, 
			margin: 15, 
			star: '☻', 
		})

		$wuxRater.init('text1', {
			value: 3, 
			star: '✩', 
			text: ['一星', '二星', '三星', '四星', '五星'], 
		})

		$wuxRater.init('text2', {
			value: 3, 
			star: '✩', 
			text: [1, 2, 3, 4, 5], 
			defaultTextColor: '#f5a623', 
		})

		$wuxRater.init('text3', {
			value: 3, 
			star: '✩', 
			text: [
				{
					text: '非常差', 
					color: 'red', 
				},
				{
					text: '很差', 
					color: 'red', 
				},
				{
					text: '一般', 
					color: 'blue', 
				},
				{
					text: '很好', 
					color: 'green', 
				},
				{
					text: '非常好', 
					color: 'orange', 
				},
			], 
			callback(value, data, text) {
				console.log(value, data, text)
			}
		})

		$wuxRater.init('embarrass', {
			value: 3, 
			star: '囧', 
			callback(value, data, text) {
				console.log(value, data, text)
			}
		})

		this.good = $wuxRater.init('good', {
			star: '屌', 
			callback(value, data, text) {
				this.setData({
					slider: value
				})
			}
		})
	},
	sliderChange(e) {
		this.good.update(e.detail.value)
	},
})