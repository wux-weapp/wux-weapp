const App = getApp()

Page({
	data: {},
	onLoad() {
		this.$wuxXnumber = App.Wux().$wuxXnumber

		this.$wuxXnumber.init('num1')

		this.$wuxXnumber.init('num2', {
			callback: (value) => console.log(value), 
		})

		this.$wuxXnumber.init('num3', {
			className: 'custom-xnumber', 
		})

		this.$wuxXnumber.init('num4', {
			step: .5, 
		})

		this.$wuxXnumber.init('num5', {
			min: -5, 
			max: 8, 
			value: 1, 
		})

		this.$wuxXnumber.init('num6', {
			disabled: !1, 
		})

		this.$wuxXnumber.init('num7', {
			longpress: !0, 
		})
	},
})