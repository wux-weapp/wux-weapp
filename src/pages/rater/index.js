const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxRater = App.Wux().$wuxRater
		this.$wuxRater.init('star', {
			value: 5, 
		})
		this.$wuxRater.init('changeColor', {
			value: 3, 
			activeColor: '#04BE02', 
		})

		this.$wuxRater.init('history', {
			value: 3, 
			disabled: !0, 
		})
		this.$wuxRater.init('decimal', {
			value: 3.7, 
			disabled: !0, 
		})
		this.$wuxRater.init('custom', {
			value: 3, 
			fontSize: 15, 
			disabled: !0, 
		})

		this.$wuxRater.init('loving', {
			value: 3, 
			star: '♡', 
		})
		this.$wuxRater.init('sunshine', {
			value: 3, 
			star: '☼', 
		})
		this.$wuxRater.init('smilies', {
			value: 3, 
			star: '☻', 
		})
	},
})