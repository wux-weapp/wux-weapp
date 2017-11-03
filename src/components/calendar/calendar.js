import Component from '../component'

class Calendar {
	constructor (options = {}) {
		Object.assign(this, {
			options, 
		})
		this.init()
	}

    /**
     * 初始化
     */
	init () {
        this._data = {}
        this.page = getCurrentPages()[getCurrentPages().length - 1]
        this.setData = this.page.setData.bind(this.page)
        this.mergeOptions(this.options)
        if (!this._data.value) {
            if (this.options.value) {
                this._data.value = this.options.value
            }
        }
        this.initialized = false
        this.animating = false
        this.opened = false
        this.isH = this.options.direction === `horizontal`
		// this.layout()
	}

    /**
     * 默认参数
     */
	setDefaults () {
		return {
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
            dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            firstDay: 1, // First day of the week, Monday
            weekendDays: [0, 6], // Sunday and Saturday
            multiple: false,
            dateFormat: 'yyyy-mm-dd',
            direction: 'horizontal', // or 'vertical'
            minDate: null,
            maxDate: null,
            touchMove: true,
            animate: true,
            closeOnSelect: true,
            weekHeader: true,
            toolbar: true,
            inline: false,
            value: [],
            onMonthAdd () {},
            onChange () {},
            onOpen () {},
            onClose () {},
            onDayClick () {},
            onMonthYearChangeStart () {},
            onMonthYearChangeEnd () {},
            onRender () {},
            onMonthsTranslate () {},
        }
	}

    /**
     * 合并参数
     */
	mergeOptions (options) {
		const defaultOptions = this.setDefaults()
	    for (let key in defaultOptions) {
	        if (defaultOptions.hasOwnProperty(key)) {
	            this.options[key] = typeof options[key] !== `undefined` ? options[key] : defaultOptions[key]
	            if (typeof this.options[key] === `function`) {
					this.options[key] = this.options[key].bind(this)
				}
	        }
	    }
	}

    /**
     * 格式化日期
     */
	formatDate (date) {
        date = new Date(date)
        const options = this.options
        const year = date.getFullYear()
        const month = date.getMonth()
        const month1 = month + 1
        const day = date.getDate()
        const weekDay = date.getDay()

        return options.dateFormat
            .replace(/yyyy/g, year)
            .replace(/yy/g, (year + '').substring(2))
            .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
            .replace(/m/g, month1)
            .replace(/MM/g, options.monthNames[month])
            .replace(/M/g, options.monthNamesShort[month])
            .replace(/dd/g, day < 10 ? '0' + day : day)
            .replace(/d/g, day)
            .replace(/DD/g, options.dayNames[weekDay])
            .replace(/D/g, options.dayNamesShort[weekDay])
    }

    /**
     * 判断日期是否存在
     */
    daysInMonth (date) {
	    const d = new Date(date)
	    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
	}

    /**
     * 设置月份数据
     */
	monthHTML (date, offset) {
		date = new Date(date)
        let year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate()

        const monthHTML = {
        	year, 
        	month, 
        	items: [], 
        }    
            
        if (offset === `next`) {
            if (month === 11) date = new Date(year + 1, 0)
            else date = new Date(year, month + 1, 1)
        }

        if (offset === `prev`) {
            if (month === 0) date = new Date(year - 1, 11)
            else date = new Date(year, month - 1, 1)
        }

        if (offset === `next` || offset === `prev`) {
            month = date.getMonth()
            year = date.getFullYear()
        }

        let daysInPrevMonth = this.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
            daysInMonth = this.daysInMonth(date),
            firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay()
        if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7

        let dayDate, currentValues = [], i, j,
            rows = 6, cols = 7,
            dayIndex = 0 + (this.options.firstDay - 1),
            today = new Date().setHours(0,0,0,0),
            minDate = this.options.minDate ? new Date(this.options.minDate).getTime() : null,
            maxDate = this.options.maxDate ? new Date(this.options.maxDate).getTime() : null

        if (this._data.value && this._data.value.length) {
            for (let i = 0; i < this._data.value.length; i++) {
                currentValues.push(new Date(this._data.value[i]).setHours(0,0,0,0))
            }
        }

        for (let i = 1; i <= rows; i++) {
            let rowHTML = []
            let row = i

            for (let j = 1; j <= cols; j++) {
                let col = j
                dayIndex ++
                let dayNumber = dayIndex - firstDayOfMonthIndex
                let type = {}

                if (dayNumber < 0) {
                    dayNumber = daysInPrevMonth + dayNumber + 1
                    type.prev = true
                    dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime()
                } else {
                    dayNumber = dayNumber + 1
                    if (dayNumber > daysInMonth) {
                        dayNumber = dayNumber - daysInMonth
                        type.next = true
                        dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime()
                    } else {
                        dayDate = new Date(year, month, dayNumber).getTime()
                    }
                }

                // Today
                if (dayDate === today) type.today = true

                // Selected
                if (currentValues.indexOf(dayDate) >= 0) type.selected = true

                // Weekend
                if (this.options.weekendDays.indexOf(col - 1) >= 0) {
                    type.weekend = true
                }

                // Disabled
                if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                    type.disabled = true
                }

                dayDate = new Date(dayDate)
                const dayYear = dayDate.getFullYear()
                const dayMonth = dayDate.getMonth()

                rowHTML.push({
                	type, 
                	year: dayYear, 
                	month: dayMonth, 
                	day: dayNumber, 
                	date: `${dayYear}-${dayMonth}-${dayNumber}`, 
                })
            }

            monthHTML.year = year
            monthHTML.month = month

            monthHTML.items.push(rowHTML)
        }

        return monthHTML
	}

    /**
     * 设置下一月份时间戳
     */
	getNextDateTime(year, month) {
		const nextMonth = parseInt(month)
        const nextYear = parseInt(year)
        const nextDate = new Date(nextYear, nextMonth)
        const nextDateTime = nextDate.getTime()
        return nextDateTime
	}

    /**
     * 设置上一月份时间戳
     */
	getPrevDateTime(year, month) {
		const prevMonth = parseInt(month)
        const prevYear = parseInt(year)
        const prevDate = new Date(prevYear, prevMonth + 1, -1)
        const prevDateTime = prevDate.getTime()
        return prevDateTime
	}

    /**
     * 更新月份数据
     */
	updateMonths(offset, update) {
        if (!update) {
            return false
        }

		if (offset === `next`) {
			const next = this._data.months[this._data.months.length - 1]
			const nextDateTime = this.getNextDateTime(next.year, next.month)
			const nextMonthHTML = this.monthHTML(nextDateTime, `next`)
			this._data.months.splice(0, 1)
			this._data.months.push(nextMonthHTML)
		}

		if (offset === `prev`) {
			const prev = this._data.months[0]
			const prevDateTime = this.getPrevDateTime(prev.year, prev.month)
			const prevMonthHTML = this.monthHTML(prevDateTime, `prev`)
			this._data.months.splice(this._data.months.length - 1, 1)
			this._data.months.unshift(prevMonthHTML)
		}
	}

    /**
     * 更新年份/月份
     */
    updateCurrentMonthYear () {
        this._data.currentMonth = parseInt(this._data.months[1].month)
        this._data.currentYear = parseInt(this._data.months[1].year)
        this._data.currentMonthName = this.options.monthNames[this._data.currentMonth]
    }

    /**
     * 下一月份数据
     */
	nextMonth (e) {
		const dataset = this._data.months[this._data.months.length - 1]
        const nextDateTime = this.getNextDateTime(dataset.year, dataset.month)
        const transitionEndCallback = this.animating ? false : true

        if (this.options.maxDate) {
            if (nextDateTime > new Date(this.options.maxDate).getTime()) {
                return this.resetMonthsTranslate()
            }
        }

        this.animating = true
        this.onMonthChangeStart(`next`)
        this.setMonthsTranslate(`next`)

        if (transitionEndCallback) {
            if (this.options.animate) {
                setTimeout(() => this.onMonthChangeEnd(`next`), 300)
            } else {
                this.onMonthChangeEnd(`next`)
            }
        }
    }

    /**
     * 上一月份数据
     */
    prevMonth (e) {
		const dataset = this._data.months[0]
        const prevDateTime = this.getPrevDateTime(dataset.year, dataset.month)
        const transitionEndCallback = this.animating ? false : true

        if (this.options.minDate) {
            if (prevDateTime < new Date(this.options.minDate).getTime()) {
                return this.resetMonthsTranslate()
            }
        }

        this.animating = true
        this.onMonthChangeStart(`prev`)
        this.setMonthsTranslate(`prev`)

        if (transitionEndCallback) {
            if (this.options.animate) {
                setTimeout(() => this.onMonthChangeEnd(`prev`), 300)
            } else {
                this.onMonthChangeEnd(`prev`)
            }
        }
    }

    /**
     * 根据年份/月份设置月份数据
     */
    setYearMonth (year, month) {
        let targetDate = null
        const currentYear = this._data.currentYear
        const currentMonth = this._data.currentMonth

        if (typeof year === `undefined`) year = currentYear
        if (typeof month === `undefined`) month = currentMonth

        if (year < currentYear) {
            targetDate = new Date(year, month + 1, -1).getTime()
        } else {
            targetDate = new Date(year, month).getTime()
        }

        if (this.options.maxDate && targetDate > new Date(this.options.maxDate).getTime()) {
            return false
        }

        if (this.options.minDate && targetDate < new Date(this.options.minDate).getTime()) {
            return false
        }

        let currentDate = new Date(currentYear, currentMonth).getTime()
        let dir = targetDate > currentDate ? `next` : `prev`
        
        const layoutDate = new Date(year, month)
        const prevMonthHTML = this.monthHTML(layoutDate, `prev`)
        const currentMonthHTML = this.monthHTML(layoutDate)
        const nextMonthHTML = this.monthHTML(layoutDate, `next`)
        const transitionEndCallback = this.animating ? false : true

        this._data.months = [prevMonthHTML, currentMonthHTML, nextMonthHTML]

        this.animating = true
        this.onMonthChangeStart(dir)
        this.setMonthsTranslate(dir)

        if (transitionEndCallback) {
            if (this.options.animate) {
                setTimeout(() => this.onMonthChangeEnd(dir, false), 300)
            } else {
                this.onMonthChangeEnd(dir, false)
            }
        }
    }

    /**
     * 下一年月份数据
     */
    nextYear () {
        this.setYearMonth(this._data.currentYear + 1)
    }

    /**
     * 上一年月份数据
     */
    prevYear () {
        this.setYearMonth(this._data.currentYear - 1)
    }

    /**
     * 月份切换开始的函数
     */
    onMonthChangeStart (dir) {
        if (typeof this.options.onMonthYearChangeStart === `function`) {
            this.options.onMonthYearChangeStart(this, this._data.currentYear, this._data.currentMonth)
        }
    }

    /**
     * 月份切换结束的函数
     */
    onMonthChangeEnd (dir, update = true) {
        this.animating = false
        this.updateMonths(dir, update)
        this.updateCurrentMonthYear()
        this.resetMonthsTranslate()
        this.render()
        if (typeof this.options.onMonthAdd === `function`) {
            this.options.onMonthAdd(this, dir === `next` ? this._data.months[this._data.months.length - 1] : this._data.months[0])
        }
        if (typeof this.options.onMonthYearChangeEnd === `function`) {
            this.options.onMonthYearChangeEnd(this, this._data.currentYear, this._data.currentMonth)
        }
    }

    /**
     * 设置月份组件样式
     */
    setMonthsTranslate (dir) {
        const sign = dir === `next` ? `-` : ``
        const transform = this.isH ? `transform: translate3d(${sign}100%, 0px, 0px)` : `transform: translate3d(0px, ${sign}100%, 0px)`
        const style = this.options.animate ? `${transform}; transition: all 300ms;` : `${transform}; transition: none;`
        if (typeof this.options.onMonthsTranslate === `function`) {
            this.options.onMonthsTranslate(style)
        }
    }

    /**
     * 重置月份组件样式
     */
    resetMonthsTranslate () {
        const style = `transform: translate3d(0px, 0px, 0px); transition: none;`
        if (typeof this.options.onMonthsTranslate === `function`) {
            this.options.onMonthsTranslate(style)
        }
    }

    /**
     * 添加勾选值
     */
    addValue (value) {
        if (this.options.multiple) {
            if (!this._data.value) this._data.value = []
            let inValuesIndex = -1
            for (let i = 0; i < this._data.value.length; i++) {
                if (new Date(value).setHours(0,0,0,0) === new Date(this._data.value[i]).setHours(0,0,0,0)) {
                    inValuesIndex = i
                }
            }
            if (inValuesIndex === -1) {
                this._data.value.push(value)
            } else {
                this._data.value.splice(inValuesIndex, 1)
            }
            this.updateValue()
        } else {
            this._data.value = [value]
            this.updateValue()
        }
    }

    /**
     * 设置勾选值
     */
    setValue (arrValues) {
        this._data.value = arrValues
        this.updateValue()
    }

    /**
     * 重置所有已选中的值
     */
    resetSelected () {
        this._data.months.forEach((n, i) => {
            n.items.forEach((v, k) => {
                v.forEach((p, j) => {
                    p.type.selected = false
                })
            })
        })
    }

    /**
     * 更新勾选值
     */
    updateValue () {
        this.resetSelected()

        for (let i = 0; i < this._data.value.length; i++) {
            let valueDate = new Date(this._data.value[i])
            let valueYear = valueDate.getFullYear()
            let valueMonth = valueDate.getMonth()
            let valueDay = valueDate.getDate()
            let currentMonth = []
            
            this._data.months.forEach((v, k) => {
                if (v.year === valueYear && v.month === valueMonth) {
                    currentMonth = v.items
                }
            })

            currentMonth.forEach((v, k) => {
                v.forEach((p, j) => {
                    if (p.year === valueYear && p.month === valueMonth && p.day === valueDay) {
                        p.type.selected = true
                    }
                })
            })
        }

        if (typeof this.options.onChange === `function`) {
            this.options.onChange(this, this._data.value, this._data.value.map((n, i) => this.formatDate(n)))
        }

        this.render()
    }

    /**
     * 设置星期
     */
    setWeekHeader () {
        this._data.weeks = []

        if (this.options.weekHeader) {
            for (let i = 0; i < 7; i++) {
                const weekDayIndex = (i + this.options.firstDay > 6) ? (i - 7 + this.options.firstDay) : (i + this.options.firstDay)
                const dayName = this.options.dayNamesShort[weekDayIndex]
                const weekend = this.options.weekendDays.indexOf(weekDayIndex) >= 0

                this._data.weeks.push({
                    weekend, 
                    dayName, 
                })
            }
        }
    }

    /**
     * 设置月份
     */
    setMonthsHTML () {
        const layoutDate = this._data.value && this._data.value.length ? this._data.value[0] : new Date().setHours(0,0,0,0)
        const prevMonthHTML = this.monthHTML(layoutDate, `prev`)
        const currentMonthHTML = this.monthHTML(layoutDate)
        const nextMonthHTML = this.monthHTML(layoutDate, `next`)

        this._data.months = [prevMonthHTML, currentMonthHTML, nextMonthHTML]
    }

    /**
     * 手指触摸事件
     */
    initCalendarEvents () {
        let touching, start, move, diffX, diffY, touchesDiff

        // 获取手指触摸点坐标
        const getTouchPosition = (e) => {
            const touches = e.touches[0]
            return {
                x: touches.pageX, 
                y: touches.pageY, 
            }
        }

        // 手指触摸动作开始
        const handleTouchStart = (e) => {
            if (!this.options.touchMove) return false
            touching = true
            start = getTouchPosition(e)
            diffX = diffY = touchesDiff = 0
        }

        // 手指触摸后移动
        const handleTouchMove = (e) => {
            if (!this.options.touchMove) return false
            if(!start || this.animating) return false
            move = getTouchPosition(e)
            diffX = Math.floor(move.x - start.x)
            diffY = Math.floor(move.y - start.y)
            touchesDiff = this.isH ? diffX : diffY
            
            const a = this.isH ? touchesDiff : 0
            const b = this.isH ? 0 : touchesDiff
            const transform = `transform: translate3d(${a}px, ${b}px, 0)`
            const style = `${transform}; transition: none;`

            if (typeof this.options.onMonthsTranslate === `function`) {
                this.options.onMonthsTranslate(style)
            }
        }

        // 手指触摸动作结束
        const handleTouchEnd = (e) => {
            if (!this.options.touchMove) return false
            touching = false
            if (Math.abs(touchesDiff) < 30) {
                return this.resetMonthsTranslate()
            } else if (touchesDiff <= -30) {
                this.nextMonth()
            } if (touchesDiff >= 30) {
                this.prevMonth()
            }
        }

        // 日期选择事件
        const handleDayClick = (e) => {
            const dataset = e.currentTarget.dataset
            const dateYear = dataset.year
            const dateMonth = dataset.month
            const dateDay = dataset.day
            const dateType = dataset.type

            if (dateType.selected && !this.options.multiple) return false
            if (dateType.disabled) return false
            if (dateType.next) this.nextMonth()
            if (dateType.prev) this.prevMonth()

            if (typeof this.options.onDayClick === `function`) {
                this.options.onDayClick(this, dateYear, dateMonth, dateDay)
            }

            this.addValue(new Date(dateYear, dateMonth, dateDay).getTime())

            if (this.options.closeOnSelect) {
                this.close()
            }
        }

        return {
            handleTouchStart, 
            handleTouchMove, 
            handleTouchEnd, 
            handleDayClick, 
        }
    }

    /**
     * 日历布局
     */
	layout () {
        this.setWeekHeader()
        this.setMonthsHTML()
        this.setValue(this._data.value)
        this.updateCurrentMonthYear()
        this.render()
	}

    /**
     * 渲染日历组件
     */
    render () {
        if (typeof this.options.onRender === `function`) {
            this.options.onRender(this._data)
        }
    }

    /**
     * 打开日历组件
     */
    open () {
        if (!this.opened) {
            this.layout()
        }

        this.opened = true
        this.initialized = true

        if (typeof this.options.onMonthAdd === `function`) {
            this._data.months.forEach((n) => this.options.onMonthAdd(this, n))
        }

        if (typeof this.options.onOpen === `function`) {
            this.options.onOpen(this)
        }
    }

    /**
     * 关闭日历组件
     */
    close () {
        if (!this.opened || this.options.inline) return false
        this.opened = false
        if (typeof this.options.onClose === `function`) {
            this.options.onClose(this)
        }
    }
}

export default {
    /**
     * 默认参数
     */
    setDefaults () {
        return {
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
            monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
            dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            firstDay: 1, // First day of the week, Monday
            weekendDays: [0, 6], // Sunday and Saturday
            multiple: false,
            dateFormat: 'yyyy-mm-dd',
            direction: 'horizontal', // or 'vertical'
            minDate: null,
            maxDate: null,
            touchMove: true,
            animate: true,
            closeOnSelect: true,
            weekHeader: true,
            toolbar: true,
            inline: false,
            value: [],
            onMonthAdd () {},
            onChange () {},
            onOpen () {},
            onClose () {},
            onDayClick () {},
            onMonthYearChangeStart () {},
            onMonthYearChangeEnd () {},
        }
    },
    /**
     * 渲染日历组件
     * @param {String} id 唯一标识
     * @param {Object} opts 配置项
     * @param {Array} opts.monthNames 月份名称
     * @param {Array} opts.monthNamesShort 月份短名
     * @param {Array} opts.dayNames 星期名称
     * @param {Array} opts.dayNamesShort 星期短名
     * @param {Number} opts.firstDay 设置一周的第一天
     * @param {Array} opts.weekendDays 设置一周顺序
     * @param {Boolean} opts.multiple 设置多选
     * @param {String} opts.dateFormat 自定义格式化日期
     * @param {String} opts.direction 动画滚动方向
     * @param {Object} opts.minDate 可选最小日期
     * @param {Object} opts.maxDate 可选最大日期
     * @param {Boolean} opts.touchMove 是否开启手势滑动
     * @param {Boolean} opts.animate 是否开启动画效果
     * @param {Boolean} opts.closeOnSelect 是否开启选中后关闭组件
     * @param {Boolean} opts.weekHeader 是否显示星期
     * @param {Boolean} opts.toolbar 是否显示工具栏
     * @param {Boolean} opts.inline 是否内联样式
     * @param {Array} opts.value 默认值
     * @param {Function} opts.onMonthAdd 选择月份时的回调函数
     * @param {Function} opts.onChange 组件值变化时回调函数
     * @param {Function} opts.onOpen 组件打开时的回调函数
     * @param {Function} opts.onClose 组件关闭时的回调函数
     * @param {Function} opts.onDayClick 选择日期时的回调函数
     * @param {Function} opts.onMonthYearChangeStart 月份切换开始的回调函数
     * @param {Function} opts.onMonthYearChangeEnd 月份切换结束回调函数
     */
    init (id, opts = {}) {
        const options = Object.assign({
            animateCss: undefined, 
            visible: !1, 
        }, this.setDefaults(), opts)

        // 实例化组件
        const component = new Component({
            scope: `$wux.calendar.${id}`, 
            data: options, 
            methods: {
                /**
                 * 初始化组件
                 */
                init () {
                    const params = Object.assign({}, opts)

                    params.onOpen = (_this) => {
                        this.show()
                        typeof options.onOpen === `function` && options.onOpen(_this)
                    }

                    params.onClose = (_this) => {
                        this.hide()
                        typeof options.onClose === `function` && options.onClose(_this)
                    }

                    params.onMonthsTranslate = (style) => {
                        this.page.setData({
                            [`$wux.calendar.${id}.style`]: style
                        })
                    }

                    params.onRender = (_data) => {
                        for(let key in _data) {
                            this.page.setData({
                                [`$wux.calendar.${id}.${key}`]: _data[key]
                            })
                        }
                    }

                    const calendar = this.calendar = new Calendar(params)

                    this.nextMonth = calendar.nextMonth.bind(calendar)
                    this.prevMonth = calendar.prevMonth.bind(calendar)
                    this.nextYear = calendar.nextYear.bind(calendar)
                    this.prevYear = calendar.prevYear.bind(calendar)

                    this.initCalendarEvents = calendar.initCalendarEvents.bind(calendar)()
                    this.handleTouchStart = this.initCalendarEvents.handleTouchStart
                    this.handleTouchMove = this.initCalendarEvents.handleTouchMove
                    this.handleTouchEnd = this.initCalendarEvents.handleTouchEnd
                    this.handleDayClick = this.initCalendarEvents.handleDayClick

                    calendar.open()

                },
                /**
                 * 下一月份数据
                 */
                nextMonth (e) {
                    return this.nextMonth(e)
                }, 
                /**
                 * 上一月份数据
                 */
                prevMonth (e) {
                    return this.prevMonth(e)
                }, 
                /**
                 * 下一年月份数据
                 */
                nextYear (e) {
                    return this.nextYear(e)
                }, 
                /**
                 * 上一年月份数据
                 */
                prevYear (e) {
                    return this.prevYear(e)
                }, 
                /**
                 * 手指触摸动作开始
                 */
                handleTouchStart (e) {
                    return this.handleTouchStart(e)
                }, 
                /**
                 * 手指触摸后移动
                 */
                handleTouchMove (e) {
                    return this.handleTouchMove(e)
                }, 
                /**
                 * 手指触摸动作结束
                 */
                handleTouchEnd (e) {
                    return this.handleTouchEnd(e)
                }, 
                /**
                 * 日期选择事件
                 */
                handleDayClick (e) {
                    return this.handleDayClick(e)
                }, 
                /**
                 * 显示
                 */
                show () {
                    const animateCss = !options.inline ? [`weui-animate-slide-up`, `weui-animate-fade-in`] : [`weui-animate-fade-in`]
                    this.setVisible(animateCss)
                    this.calendar.opened = true;
                },
                /**
                 * 隐藏
                 */
                hide () {
                    const animateCss = !options.inline ? [`weui-animate-slide-down`, `weui-animate-fade-out`] : [`weui-animate-fade-out`]
                    this.setHidden(animateCss)
                },
            },
        })

        component.init()

        return component
    }
}