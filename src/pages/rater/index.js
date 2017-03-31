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
			star: '♡', 
		})
		$wuxRater.init('sunshine', {
			value: 3, 
			star: '☼', 
		})
		$wuxRater.init('smilies', {
			value: 3, 
			star: '☻', 
		})
	},
})