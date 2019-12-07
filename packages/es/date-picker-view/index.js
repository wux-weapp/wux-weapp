import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import locales from './locales/index'
import { props } from './props'

const DATETIME = 'datetime'
const DATE = 'date'
const TIME = 'time'
const MONTH = 'month'
const YEAR = 'year'
const ONE_DAY = 24 * 60 * 60 * 1000

function fomartArray(min, max, step = 1) {
    let i = min
    let result = []
    while (i <= max) {
        result.push(i)
        i+=step
    }
    return result
}

function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function pad(n) {
    return n < 10 ? `0${n}` : n + ''
}

function cloneDate(date) {
    return new Date(+date)
}

function setMonth(date, month) {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))))
    date.setMonth(month)
}

function valueToDate(value, props = {}) {
    if (!Array.isArray(value)) {
        if (typeof value === 'string') {
            value = value.replace(/\-/g, '/')
        }
        if (!isNaN(Number(value))) {
            value = Number(value)
        }
        return new Date(value)
    }

    const { mode, use12Hours } = props
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const day = now.getDate()
    const newValue = value.map((v) => Number(v))
    if (use12Hours && [DATETIME, TIME].includes(mode)) {
        const hourIndex = mode === DATETIME ? 3 : 0
        const ampmIndex = newValue.length - 1
        const ampm = Number(newValue[ampmIndex])
        let nhour = Number(newValue[hourIndex])

        if (ampm === 1) {
            if (nhour <= 12) {
                nhour += 12
            }
            nhour = nhour >= 24 ? 0 : nhour
        } else {
            if (nhour === 0) {
                nhour = 12
            }
            if (nhour > 12) {
                nhour -= 12
            }
            nhour = nhour >= 12 ? 0 : nhour
        }

        newValue.splice(hourIndex, 1, nhour)
        newValue.splice(ampmIndex, 1)
    }
    if (mode === TIME) {
        newValue.unshift(day)
        newValue.unshift(month)
        newValue.unshift(year)
    } else if (mode === MONTH) {
        newValue.push(day)
    } else if (mode === YEAR) {
        newValue.push(month)
        newValue.push(day)
    }
    while (newValue.length <= 6) {
        newValue.push(0)
    }
    return new Date(...newValue)
}

baseComponent({
    properties: props,
    data: {
        inputValue: [],
        options: [],
    },
    observers: {
        inputValue() {
            this.updatedCols()
        },
        value(value) {
            this.setValue(value)
        },
        ['mode, minuteStep, use12Hours, minDate, maxDate, minHour, maxHour, minMinute, maxMinute, lang']() {
            this.setValue(this.data.inputValue)
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
            return this.data.minDate ? valueToDate(this.data.minDate, this.data) : this.getDefaultMinDate()
        },
        getMaxDate() {
            return this.data.maxDate ? valueToDate(this.data.maxDate, this.data) : this.getDefaultMaxDate()
        },
        getDateMember(type = 'min', member = 'year') {
            const methods = {
                min: 'getMinDate',
                max: 'getMaxDate',
                year: 'getFullYear',
                month: 'getMonth',
                day: 'getDate',
                hour: 'getHours',
                minute: 'getMinutes',
            }
            return this[methods[type]]()[methods[member]]()
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
            let newValue = cloneDate(this.getDate())
            if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
                switch (index) {
                case 0:
                    newValue.setFullYear(value)
                    break
                case 1:
                    setMonth(newValue, value)
                    break
                case 2:
                    newValue.setDate(value)
                    break
                case 3:
                    this.setHours(newValue, value)
                    break
                case 4:
                    newValue.setMinutes(value)
                    break
                case 5:
                    this.setAmPm(newValue, value)
                    break
                default:
                    break
                }
            } else if (mode === TIME) {
                switch (index) {
                case 0:
                    this.setHours(newValue, value)
                    break
                case 1:
                    newValue.setMinutes(value)
                    break
                case 2:
                    this.setAmPm(newValue, value)
                    break
                default:
                    break
                }
            }
            return this.clipDate(newValue)
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
            return this.clipDate(date ? valueToDate(date, this.data) : this.getMinDate())
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
            const maxDay = maxDateYear === selYear && maxDateMonth === selMonth ? maxDateDay : getDaysInMonth(date)

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
        getValueCols(d) {
            const { mode, use12Hours } = this.data
            const date = this.getDate(d)
            let cols = []
            let value = []

            if (mode === YEAR) {
                return {
                    cols: this.getDateData(date),
                    value: [date.getFullYear() + ''],
                }
            }

            if (mode === MONTH) {
                return {
                    cols: this.getDateData(date),
                    value: [date.getFullYear() + '', date.getMonth() + ''],
                }
            }

            if (mode === DATETIME || mode === DATE) {
                cols = this.getDateData(date)
                value = [date.getFullYear() + '', date.getMonth() + '', date.getDate() + '']
            }

            if (mode === DATETIME || mode === TIME) {
                cols = cols.concat(this.getTimeData(date))
                const hour = date.getHours()
                const selMinute = date.getMinutes()
                let dtValue = [hour + '', selMinute + '']
                let nhour = hour
                if (use12Hours) {
                    nhour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour)
                    dtValue = [nhour + '', selMinute + '', (hour >= 12 ? 1 : 0) + '']
                }
                value = value.concat(dtValue)
            }

            return {
                value,
                cols,
            }
        },
        onValueChange(e) {
            const { value, index } = e.detail
            const newDate = this.getNewDate(value, index)
            const { value: newValue, cols: newCols } = this.getValueCols(newDate)
            const values = this.getValue(newValue, newCols)
            this.triggerEvent('valueChange', { ...e.detail, ...values, date: +newDate })
        },
        updatedCols() {
            const { cols } = this.getValueCols()
            this.setData({ cols })
        },
        updated(inputValue) {
            if (this.data.inputValue !== inputValue) {
                this.setData({
                    inputValue,
                })
            }
        },
        setValue(value = this.data.inputValue) {
            const { value: inputValue } = this.getValueCols()
            this.updated(inputValue)
        },
        getValue(value = this.data.inputValue, cols = this.data.cols) {
            this.picker = this.picker || this.selectComponent('#wux-picker')
            return {
                ...this.picker.getValue(value, cols),
                date: +this.getDate(),
            }
        },
    },
    attached() {
        this.setValue(this.data.value)
    },
})






















