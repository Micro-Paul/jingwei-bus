//字符串拼接
function strFormat(str) {
	return str < 10 ? `0${str}` : str
}

//时间戳转日期
export function timeStamp(time) {
	const dates = new Date(time)
	const year = dates.getFullYear()
	const month = dates.getMonth() + 1
	const date = dates.getDate()
	const day = dates.getDay()
	const hour = dates.getHours()
	const min = dates.getMinutes()
	const days = ['日', '一', '二', '三', '四', '五', '六']
	return {
		showDate: `${strFormat(month)}.${strFormat(date)}`,
		allDate: `${year}/${strFormat(month)}/${strFormat(date)}`,
		date: `${strFormat(year)}-${strFormat(month)}-${strFormat(date)}`, //返回的日期 07-01
		day: `周${days[day]}`, //返回的礼拜天数  星期一
		hour: strFormat(hour) + ':' + strFormat(min) + ':00' //返回的时钟 08:00
	}
}

