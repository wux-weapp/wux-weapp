import data from './data'
const App = getApp()

Page({
	data: {},
	onLoad() {
		this.initSeats()
	},
	initSeats() {
		const seatingPlan = data.msg.seatingPlan
		const maps = seatingPlan.ajaxSeatBeanList
		const maxRowIndex = seatingPlan.maxRowIndex
		const maxColumnIndex = seatingPlan.maxColumnIndex

		this.$wuxSeats = App.Wux().$wuxSeats.init('movie', {
			maps: maps, 
			maxRowIndex: maxRowIndex, 
			maxColumnIndex: maxColumnIndex, 
			max: 5, 
			onSelect(items) {
				console.log(items)

				this.page.setData({
					items, 
					total: (items.length * 20).toFixed(2)
				})
			},
		})

		this.$wuxSeats.disabled([`4520200`])
	},
})