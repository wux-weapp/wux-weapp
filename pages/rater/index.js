const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxRater = App.wux(this).$wuxRater
		this.$wuxRater.render('star', {
			value: 5, 
		})
		this.$wuxRater.render('changeColor', {
			value: 3, 
			activeColor: '#04BE02', 
		})


		this.$wuxRater.render('history', {
			value: 3, 
			disabled: !0, 
		})
		this.$wuxRater.render('decimal', {
			value: 3.7, 
			disabled: !0, 
		})
		this.$wuxRater.render('custom', {
			value: 3, 
			fontSize: 15, 
			disabled: !0, 
		})

		this.$wuxRater.render('loving', {
			value: 3, 
			star: '♡', 
		})
		this.$wuxRater.render('sunshine', {
			value: 3, 
			star: '☼', 
		})
		this.$wuxRater.render('smilies', {
			value: 3, 
			star: '☻', 
		})
	},
})