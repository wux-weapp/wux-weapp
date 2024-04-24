import warning from '../helpers/libs/warning'

export const DATETIME = 'datetime'
export const DATE = 'date'
export const TIME = 'time'
export const MONTH = 'month'
export const YEAR = 'year'
export const ONE_DAY = 24 * 60 * 60 * 1000
export const TILL_NOW = 'TILL_NOW'

export function fomartArray(min, max, step = 1) {
    let i = min
    let result = []
    while (i <= max) {
        result.push(i)
        i+=step
    }
    return result
}

export function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

export function pad(n) {
    return n < 10 ? `0${n}` : n + ''
}

export function cloneDate(date) {
    return new Date(+date)
}

export function setMonth(date, month) {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))))
    date.setMonth(month)
}

export function isTillNow(value) {
    return value && (value.tillNow || value[0] === TILL_NOW)
}

export const modeRecord = {
    datetime: 'yyyy-MM-dd hh:mm',
    date: 'yyyy-MM-dd',
    year: 'yyyy',
    month: 'yyyy-MM',
    time: 'hh:mm',
}

export const makePattern = (str) => new RegExp(`^${str.replace(/[a-zA-Z]/g, '\\d')}$`)

export const isDateString = (value) =>
    Object.keys(modeRecord).some((key) => makePattern(modeRecord[key]).test(value))

export function isInvalidDate(date) {
    return isNaN(Date.parse(date)) && isNaN(new Date(date).getTime())
}

export function convertStringArrayToDate(value, props = {}) {
    // Till Now
    if (isTillNow(value)) {
        return new Date()
    }

    // dateString or Unix 时间戳
    if (!Array.isArray(value)) {
        const originalValue = value

        if (typeof value === 'string' && isDateString(value)) {
            const now = new Date()
            // fix yyyy to yyyy-MM-dd
            if (makePattern(modeRecord.year).test(value)) {
                value = `${value}-${now.getMonth()}-${now.getDate()}`
            }
            // fix yyyy-MM to yyyy-MM-dd
            if (makePattern(modeRecord.month).test(value)) {
                value = `${value}-${now.getDate()}`
            }
            // fix hh:mm to yyyy-MM-dd hh:mm
            if (makePattern(modeRecord.time).test(value)) {
                value = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${value}`
            }
            // fix ios
            value = value.replace(/\-/g, '/')
        } else if (!isNaN(parseInt(value))) {
            value = parseInt(value)
        }

        const newDate = new Date(value)

        if (isInvalidDate(newDate)) {
            warning(false, `${originalValue} not a date.`)
            return new Date()
        }

        return newDate
    }

    const { mode, use12Hours } = props

    // [year, monthIndex, date, hours, minutes, seconds]
    const fixValue = (v, m) => {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()
        const day = now.getDate()
        if (m === DATETIME) {
            return [
                v[0] ? parseInt(v[0]) : year,
                v[1] ? parseInt(v[1]) : 0,
                v[2] ? parseInt(v[2]) : 1,
                v[3] ? parseInt(v[3]) : 0,
                v[4] ? parseInt(v[4]) : 0,
                0,
            ]
        } else if (m === TIME) {
            return [
                year,
                month,
                day,
                v[0] ? parseInt(v[0]) : 0,
                v[1] ? parseInt(v[1]) : 0,
                0,
            ]
        } else if (m === DATE) {
            return [
                v[0] ? parseInt(v[0]) : year,
                v[1] ? parseInt(v[1]) : 0,
                v[2] ? parseInt(v[2]) : 1,
                0,
                0,
                0,
            ]
        } else if (m === MONTH) {
            return [
                v[0] ? parseInt(v[0]) : year,
                v[1] ? parseInt(v[1]) : 0,
                1,
                0,
                0,
                0,
            ]
        } else if (m === YEAR) {
            return [
                v[0] ? parseInt(v[0]) : year,
                0,
                1,
                0,
                0,
                0,
            ]
        }
    }
    
    const getAmpm = (v, m) => {
        if (m === DATETIME) {
            return v[5] ? String(v[5]) : '0'
        } else if (m === TIME) {
            return v[2] ? String(v[2]) : '0'
        }
    }
    
    let newValue = fixValue(value, mode)

    // use12Hours ampm
    if (use12Hours) {
        if (mode === TIME || mode === DATETIME) {
            const ampm = getAmpm(value, mode)
            const hourIndex = 3
            let nhour = parseInt(newValue[hourIndex])

            if (ampm === '1') {
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
        }
    }

    return new Date(...newValue)
}

export function convertDateToStringArray(date, props = {}) {
    if (!date) { return [] }
    const { mode, use12Hours } = props
    let value = []

    if (mode === YEAR) {
        value = [date.getFullYear() + '']
    }

    if (mode === MONTH) {
        value = [date.getFullYear() + '', date.getMonth() + '']
    }

    if (mode === DATETIME || mode === DATE) {
        value = [date.getFullYear() + '', date.getMonth() + '', date.getDate() + '']
    }

    if (mode === DATETIME || mode === TIME) {
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

    return value
}
