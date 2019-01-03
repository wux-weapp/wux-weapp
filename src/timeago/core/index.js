
/**
 * 解析时间
 */
export const parse = (date) => {
	if (date instanceof Date) return date
	if (!isNaN(date) || /^\d+$/.test(date)) return new Date(parseInt(date, 10))
	let s = date.trim()
	s = s.replace(/\.\d+/,"") // remove milliseconds
	s = s.replace(/-/,"/").replace(/-/,"/")
	s = s.replace(/T/," ").replace(/Z/," UTC")
	s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2") // -04:00 -> -0400
	s = s.replace(/([\+\-]\d\d)$/," $100") // +09 -> +0900
	return new Date(s)
}

/**
 * 计算月份差
 */
export const monthDiff = (startMonth, endMonth) => {
	const start = parse(startMonth)
	const end = parse(endMonth)
	return (start.getFullYear() - end.getFullYear()) * 12 + start.getMonth() - end.getMonth() 
}

/**
 * 计算时间差
 */
export const diff = (date, nowDate, unit) => {
	const start = parse(date)
	const end = nowDate ? parse(nowDate) : new Date()
	const output = end.getTime() - start.getTime()

	return unit === 'second' && output / 1000 ||
		unit === 'minute' && output / 1000 / 60 ||
		unit === 'hour' && output / 1000 / 60 / 60 ||
		unit === 'day' && output / 1000 / 60 / 60 / 24 ||
		unit === 'week' && output / 1000 / 60 / 60 / 24 / 7 ||
		unit === 'month' && monthDiff(start, end) ||
		unit === 'quarter' && monthDiff(start, end) / 3 ||
		unit === 'year' && monthDiff(start, end) / 12 || output
}

/**
 * default language
 */
const defaults = {
    second: ['刚刚', '片刻后'],
    seconds: ['%d 秒前', '%d 秒后'],
    minute: ['大约 1 分钟前', '大约 1 分钟后'],
    minutes: ['%d 分钟前', '%d 分钟后'],
    hour: ['大约 1 小时前', '大约 1 小时后'],
    hours: ['%d 小时前', '%d 小时后'],
    day: ['1 天前', '1 天后'],
    days: ['%d 天前', '%d 天后'],
    month: ['大约 1 个月前', '大约 1 个月后'],
    months: ['%d 月前', '%d 月后'],
    year: ['大约 1 年前', '大约 1 年后'],
    years: ['%d 年前', '%d 年后'],
}

/**
 * format timeago
 * @param    {Number} diff 时间差
 * @param    {Object} opts 配置参数
 * @return   {String}      文本内容
 */
export const format = (diff, opts) => {
	const options = Object.assign({}, defaults, opts)
	const agoin = diff < 0 ? 1 : 0 // timein or timeago
	const seconds = Math.abs(diff) / 1000
	const minutes = seconds / 60
	const hours = minutes / 60
	const days = hours / 24
	const years = days / 365
	const substitute = (string, number) => string.replace(/%d/i, number)
	return seconds < 10 && substitute(options.second[agoin], parseInt(seconds)) ||
		seconds < 45 && substitute(options.seconds[agoin], parseInt(seconds)) ||
		seconds < 90 && substitute(options.minute[agoin], 1) ||
		minutes < 45 && substitute(options.minutes[agoin], parseInt(minutes)) ||
		minutes < 90 && substitute(options.hour[agoin], 1) ||
		hours < 24 && substitute(options.hours[agoin], parseInt(hours)) ||
		hours < 42 && substitute(options.day[agoin], 1) ||
		days < 30 && substitute(options.days[agoin], parseInt(days)) ||
		days < 45 && substitute(options.month[agoin], 1) ||
		days < 365 && substitute(options.months[agoin], parseInt(days / 30)) ||
		years < 1.5 && substitute(options.year[agoin], 1) ||
		substitute(options.years[agoin], parseInt(years))
}