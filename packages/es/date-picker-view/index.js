import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import locales from './locales/index'
import { props } from './props'
import {
    DATETIME,
    DATE,
    TIME,
    MONTH,
    YEAR,
    ONE_DAY,
    TILL_NOW,
    fomartArray,
    getDaysInMonth,
    pad,
    cloneDate,
    setMonth,
    isTillNow,
    convertStringArrayToDate,
    convertDateToStringArray,
} from './utils'

baseComponent({
    properties: props,
    data: {
        inputValue: [],
        options: [],
    },
    observers: {
        inputValue(inputValue) {
            this.updatedCols(inputValue)
        },
        ['value, mode, minuteStep, use12Hours, minDate, maxDate, minHour, maxHour, minMinute, maxMinute, lang'](value) {
            this.setValue(value)
        },
    },
    methods: {
        getDefaultMinDate() {
            if (!this.defaultMinDate) {
                this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0)
            }
            return this.defaultMinDate
        },
        getDefaultMaxDate() {
            if (!this.defaultMaxDate) {
                this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59)
            }
            return this.defaultMaxDate
        },
        getMinDate() {
            return this.data.minDate
                ? convertStringArrayToDate(this.data.minDate, this.data)
                : this.getDefaultMinDate()
        },
        getMaxDate() {
            return this.data.maxDate
                ? convertStringArrayToDate(this.data.maxDate, this.data)
                : this.getDefaultMaxDate()
        },
        getDateMember(type = 'min', member = 'year') {
            const internalHooks = {
                min: 'getMinDate',
                max: 'getMaxDate',
            }
            const publicHooks = {
                year: 'getFullYear',
                month: 'getMonth',
                day: 'getDate',
                hour: 'getHours',
                minute: 'getMinutes',
            }
            return this[internalHooks[type]]()[publicHooks[member]]()
        },
        getDisplayHour(rawHour) {
            // 12 hour am (midnight 00:00) -> 12 hour pm (noon 12:00) -> 12 hour am (midnight 00:00)
            if (this.data.use12Hours) {
                if (rawHour === 0) {
                    rawHour = 12
                }
                if (rawHour > 12) {
                    rawHour -= 12
                }
                return rawHour
            }
            return rawHour
        },
        setHours(date, hour) {
            if (this.data.use12Hours) {
                const dh = date.getHours()
                let nhour = hour
                nhour = dh >= 12 ? hour + 12 : hour
                nhour = nhour >= 24 ? 0 : nhour // Make sure no more than one day
                date.setHours(nhour)
            } else {
                date.setHours(hour)
            }
        },
        setAmPm(date, index) {
            if (index === 0) {
                date.setTime(+date - ONE_DAY / 2)
            } else {
                date.setTime(+date + ONE_DAY / 2)
            }
        },
        getNewDate(values, index) {
            const value = parseInt(values[index], 10)
            const { mode } = this.data
            let newDate = cloneDate(this.getDate())
            if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
                switch (index) {
                        case 0:
                            newDate.setFullYear(value)
                            break
                        case 1:
                            setMonth(newDate, value)
                            break
                        case 2:
                            newDate.setDate(value)
                            break
                        case 3:
                            this.setHours(newDate, value)
                            break
                        case 4:
                            newDate.setMinutes(value)
                            break
                        case 5:
                            this.setAmPm(newDate, value)
                            break
                        default:
                            break
                }
            } else if (mode === TIME) {
                switch (index) {
                        case 0:
                            this.setHours(newDate, value)
                            break
                        case 1:
                            newDate.setMinutes(value)
                            break
                        case 2:
                            this.setAmPm(newDate, value)
                            break
                        default:
                            break
                }
            }
            return this.clipDate(newDate)
        },
        clipDate(date) {
            const { mode } = this.data
            const minDate = this.getMinDate()
            const maxDate = this.getMaxDate()
            if (mode === DATETIME) {
                if (date < minDate) {
                    return cloneDate(minDate)
                }
                if (date > maxDate) {
                    return cloneDate(maxDate)
                }
            } else if (mode === DATE || mode === YEAR || mode === MONTH) {
                if (+date + ONE_DAY <= minDate) {
                    return cloneDate(minDate)
                }
                if (date >= +maxDate + ONE_DAY) {
                    return cloneDate(maxDate)
                }
            } else if (mode === TIME) {
                const maxHour = maxDate.getHours()
                const maxMinutes = maxDate.getMinutes()
                const minHour = minDate.getHours()
                const minMinutes = minDate.getMinutes()
                const hour = date.getHours()
                const minutes = date.getMinutes()
                if (hour < minHour || hour === minHour && minutes < minMinutes) {
                    return cloneDate(minDate)
                }
                if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
                    return cloneDate(maxDate)
                }
            }
            return date
        },
        getDate(d) {
            const date = d ? d : this.data.value
            return this.clipDate(
                date ? convertStringArrayToDate(date, this.data) : this.getMinDate()
            )
        },
        getDateData(date) {
            const { mode, lang } = this.data
            const locale = locales[lang]
            const selYear = date.getFullYear()
            const selMonth = date.getMonth()

            const minDateYear = this.getDateMember('min', 'year')
            const maxDateYear = this.getDateMember('max', 'year')
            const minDateMonth = this.getDateMember('min', 'month')
            const maxDateMonth = this.getDateMember('max', 'month')
            const minDateDay = this.getDateMember('min', 'day')
            const maxDateDay = this.getDateMember('max', 'day')

            const years = fomartArray(minDateYear, maxDateYear).map((i) => ({
                value: i + '',
                label: i + locale.year + '',
            }))

            if (mode === YEAR) {
                return [years]
            }

            const minMonth = minDateYear === selYear ? minDateMonth : 0
            const maxMonth = maxDateYear === selYear ? maxDateMonth :  11
            const months = fomartArray(minMonth, maxMonth).map((i) => ({
                value: i + '',
                label: i + 1 + locale.month + '',
            }))

            if (mode === MONTH) {
                return [years, months]
            }

            const minDay = minDateYear === selYear && minDateMonth === selMonth ? minDateDay : 1
            const maxDay = maxDateYear === selYear && maxDateMonth === selMonth
                ? maxDateDay
                : getDaysInMonth(date)

            const days = fomartArray(minDay, maxDay).map((i) => ({
                value: i + '',
                label: i + locale.day + '',
            }))

            return [years, months, days]
        },
        getTimeData(date) {
            let { minHour, maxHour, minMinute, maxMinute } = this.data
            const { mode, minuteStep, use12Hours, lang } = this.data
            const locale = locales[lang]
            const minDateMinute = this.getDateMember('min', 'minute')
            const maxDateMinute = this.getDateMember('max', 'minute')
            const minDateHour = this.getDateMember('min', 'hour')
            const maxDateHour = this.getDateMember('max', 'hour')
            const hour = date.getHours()

            if (mode === DATETIME) {
                const year = date.getFullYear()
                const month = date.getMonth()
                const day = date.getDate()
                const minDateYear = this.getDateMember('min', 'year')
                const maxDateYear = this.getDateMember('max', 'year')
                const minDateMonth = this.getDateMember('min', 'month')
                const maxDateMonth = this.getDateMember('max', 'month')
                const minDateDay = this.getDateMember('min', 'day')
                const maxDateDay = this.getDateMember('max', 'day')
                if (minDateYear === year && minDateMonth === month && minDateDay === day) {
                    minHour = minDateHour
                    if (minDateHour === hour) {
                        minMinute = minDateMinute
                    }
                }
                if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
                    maxHour = maxDateHour
                    if (maxDateHour === hour) {
                        maxMinute = maxDateMinute
                    }
                }
            } else {
                minHour = minDateHour
                if (minDateHour === hour) {
                    minMinute = minDateMinute
                }
                maxHour = maxDateHour
                if (maxDateHour === hour) {
                    maxMinute = maxDateMinute
                }
            }

            let hours = []
            if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
                minHour = this.getDisplayHour(minHour)
            } else if (minHour === 0 && use12Hours) {
                minHour = 1
                hours.push({
                    value: '0',
                    label: locale.hour ? '12' + locale.hour : '12',
                })
            }
            maxHour = this.getDisplayHour(maxHour)
            hours = [...hours, ...fomartArray(minHour, maxHour).map((i) => ({
                value: i + '',
                label: locale.hour ? i + locale.hour + '' : pad(i),
            }))]

            const minutes = []
            const selMinute = date.getMinutes()
            for (let i = minMinute; i <= maxMinute; i += minuteStep) {
                minutes.push({
                    value: i + '',
                    label: locale.minute ? i + locale.minute + '' : pad(i),
                })
                if (selMinute > i && selMinute < i + minuteStep) {
                    minutes.push({
                        value: selMinute + '',
                        label: locale.minute ? selMinute + locale.minute + '' : pad(selMinute),
                    })
                }
            }

            const ampm = [{ value: '0', label: locale.am }, { value: '1', label: locale.pm }]

            return [hours, minutes].concat(use12Hours ? [ampm] : [])
        },
        generateDatePickerColumns(selected, d) {
            const { mode, tillNow, lang } = this.data
            const locale = locales[lang]
            const date = this.getDate(d)
            let cols = []

            if (mode === YEAR) {
                cols = this.getDateData(date)
            }

            if (mode === MONTH) {
                cols = this.getDateData(date)
            }

            if (mode === DATETIME || mode === DATE) {
                cols = this.getDateData(date)
            }

            if (mode === DATETIME || mode === TIME) {
                cols = cols.concat(this.getTimeData(date))
            }

            // Till Now
            if (tillNow) {
                cols[0].push({
                    label: locale.tillNow,
                    value: TILL_NOW,
                })

                if (selected && selected[0] === TILL_NOW) {
                    cols.forEach((_, i) => {
                        if (i >= 1) {
                            cols[i] = []
                        }
                    })
                }
            }

            return cols
        },
        onValueChange(e) {
            const { value, index } = e.detail
            const tillNow = value[0] === TILL_NOW
            const newDate = tillNow ? this.getDate(new Date()) : this.getNewDate(value, index)
            const newCols = this.generateDatePickerColumns(value, newDate)
            const values = this.getValue(value, newCols)
            this.triggerEvent('valueChange', { ...e.detail, ...values, date: +newDate, tillNow })
        },
        updatedCols(inputValue) {
            const cols = this.generateDatePickerColumns(inputValue)
            this.setData({ cols })
        },
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({
                    inputValue,
                })
            }
        },
        setValue(v) {
            const inputValue = this.fixValue(v)
            this.updated(inputValue)
        },
        fixValue(v) {
            const props = this.data
            const { mode, use12Hours } = props
            let inputValue = []
            if (isTillNow(v)) {
                // Till Now
                inputValue = [TILL_NOW, '', '' , '', '', '']
                if (mode === YEAR) {
                    inputValue = inputValue.slice(0, 1)
                } else if (mode === MONTH) {
                    inputValue = inputValue.slice(0, 2)
                } else if (mode === DATE) {
                    inputValue = inputValue.slice(0, 3)
                } else if (mode === TIME) {
                    inputValue = inputValue.slice(0, !use12Hours ? 2 : 3)
                } else if (mode === DATETIME) {
                    inputValue = inputValue.slice(0, !use12Hours ? 5 : 6)
                }
            } else {
                inputValue = convertDateToStringArray(this.getDate(v), props)
            }
            return inputValue
        },
        getValue(value = this.data.inputValue, cols = this.data.cols) {
            this.picker = this.picker || this.querySelector('#wux-picker')
            const newValue = this.fixValue(value)
            const values = this.picker.getValue(newValue, cols)
            const tillNow = values.value[0] === TILL_NOW
            return {
                ...values,
                date: +this.getDate(),
                tillNow,
            }
        },
    },
    attached() {
        this.setValue(this.data.value)
    },
})






















