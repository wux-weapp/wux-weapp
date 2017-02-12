const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxXnumber = App.wux(this).$wuxXnumber

		this.$wuxXnumber.render('num1')

		this.$wuxXnumber.render('num2', {
			callback: (value) => console.log(value), 
		})

		this.$wuxXnumber.render('num3', {
			className: 'custom-xnumber', 
		})

		this.$wuxXnumber.render('num4', {
			step: .5, 
		})

		this.$wuxXnumber.render('num5', {
			min: -5, 
			max: 8, 
			value: 1, 
		})

		this.$wuxXnumber.render('num6', {
			disabled: !1, 
		})
	},
})