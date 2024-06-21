import {
    gt,
    add,
    diff,
    endOf,
    startOf
} from 'date-arithmetic'


type TDate = string | number | Date

const MS_IN_SEC = 1000
const MS_IN_MIN = MS_IN_SEC * 60
const MS_IN_HOUR = MS_IN_MIN * 60
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7

export const MILLI = {
    second: MS_IN_SEC,
    minute: MS_IN_MIN,
    hour: MS_IN_HOUR,
    day: MS_IN_DAY,
    week: MS_IN_WEEK
}

export const formats = {
    'default': 'YYYY/MM/dd',
    time: 'hh:mm AA',
    time2: 'h:mm AA',
    shortDate: 'MM/dd',
    mediumDate: 'YY/MM/dd',
    americanShortDate: 'M/d/YYYY',
    americanMediumDate: 'MM/dd/YYYY',
    separatedYearDate: 'MMM dd, YYYY',
    separatedYearDateTime: 'MMM dd, YYYY hh:mm AA',
    longDate: 'YYYY/MM/dd',
    longDateTime: 'YYYY/MM/dd HH:mm:ss',
    longDateMediumTime12: 'MM/dd/YYYY hh:mm AA',
    longDateMediumTime12TimeZone: 'MM/dd/YYYY hh:mm AA Z',
    isoDateTime: 'YYYY-MM-ddTHH:mm:ss.000'
}

function pad(val: number | string, len = 2) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
        val = '0' + val
    }
    return val
}

export function isDate(date: unknown) {
    return date instanceof Date
}

export function format(date: TDate, format: string, utc?: boolean) {
    let df = formats
    date = new Date(date)
    let token = /d{1,4}|M{1,4}|YY(?:YY)?|([HhmsAa])\1?|[oS]|[zZ]/g

    format = String(df[format] || format || df['default'])

    let abbr = getTimeZoneAbbr(date)

    let prf = utc ? 'getUTC' : 'get'
    let d: number = date[prf + 'Date']()
    let D: number = date[prf + 'Day']()
    let M: number = date[prf + 'Month']()
    let Y: number = date[prf + 'FullYear']()
    let H: number = date[prf + 'Hours']()
    let m: number = date[prf + 'Minutes']()
    let s: number = date[prf + 'Seconds']()
    let o = utc ? 0 : date.getTimezoneOffset()
    let z = abbr.toLowerCase()
    let Z = abbr.toUpperCase()
    let flags = {
        d: d,
        dd: pad(d),
        ddd: i18n.dayNames[D],
        dddd: i18n.dayNames[D + 7],
        M: M + 1,
        MM: pad(M + 1),
        MMM: i18n.monthNames[M],
        MMMM: i18n.monthNames[M + 12],
        YY: String(Y).slice(2),
        YYYY: Y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        m: m,
        mm: pad(m),
        s: s,
        ss: pad(s),
        a: H < 12 ? 'a' : 'p',
        aa: H < 12 ? 'am' : 'pm',
        A: H < 12 ? 'A' : 'P',
        AA: H < 12 ? 'AM' : 'PM',
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10) * d % 10],
        z: '(' + z + ')',
        Z: '(' + Z + ')'
    }

    return format.replace(token, function (t) {
        return (t in flags) ? flags[t] : t.slice(1, t.length - 1)
    })
}

export const i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
}

export function getTimeZoneAbbr(date: TDate) {
    date = new Date(date)

    let timeString = date.toTimeString()
    let abbr = timeString.match(/\([a-z ]+\)/i)
    if (abbr && abbr[0]) {
        // 17:56:31 GMT-0600 (CST)
        // 17:56:31 GMT-0600 (Central Standard Time)
        abbr = abbr[0].match(/[A-Z]/g)
        return abbr ? abbr.join('') : undefined
    } else {
        // 17:56:31 CST
        // 17:56:31 GMT+0800 (台北標準時間)
        abbr = timeString.match(/[A-Z]{3,5}/g)
        return abbr ? abbr[0] : undefined
    }
}

export function isTomorrow(date: TDate) {
    if (!date) return false
    let d1 = startOf(new Date(), 'day')
    let d2 = startOf(new Date(date), 'day')
    return (diff(d1, d2, 'day') === 1)
}

export function isPast(date: TDate) {
    return new Date(date).getTime() < Date.now()
}

export function isPastDate(date) {
    if (!date) return false
    let d1 = startOf(new Date(), 'day')
    let d2 = startOf(new Date(date), 'day')
    return (gt(d1, d2, 'day') > 0)
}

export function isToday(date: TDate) {
    if (!date) return false
    let d1 = startOf(new Date(), 'day')
    let d2 = startOf(new Date(date), 'day')
    return (diff(d1, d2, 'day') === 0)
}

export function isYesterday(date: TDate) {
    let d1 = startOf(new Date(), 'day')
    let d2 = startOf(date, 'day')
    return (diff(d2, d1, 'day') === 1)
}

export function isCurrentMonth(date: TDate) {
    return new Date().getMonth() === new Date(date).getMonth()
}

export function getStartOfDay(date: TDate) {
    return startOf(new Date(date), 'day')
}

export function getStartOfDayTime(date: TDate) {
    return getStartOfDay(date).getTime()
}

export function getEndOfDay(date: TDate) {
    return endOf(new Date(date), 'day')
}

export function getEndOfDayTime(date) {
    return getEndOfDay(date).getTime()
}

export function getTodayStartOfDayTime() {
    return startOf(Date.now(), 'day').getTime()
}

export function getTodayEndOfDayTime() {
    return endOf(Date.now(), 'day').getTime()
}

export function getStartOfWeek(date: TDate, firstDay: number) {
    return startOf(new Date(date), 'week', firstDay)
}

export function getStartOfWeekAndDay(date: TDate, firstDay: number) {
    return startOf(getStartOfWeek(date, firstDay), 'day')
}

export function getEndOfWeek(date: TDate, firstDay: number, includeWeekends = true) {
    return add(endOf(new Date(date), 'week', firstDay), includeWeekends ? 0 : -2, 'day')
}

export function getEndOfWeekAndDay(date: TDate, firstDay: number, includeWeekends = true) {
    return endOf(getEndOfWeek(date, firstDay, includeWeekends), 'day')
}

export function getStartOfWeekTime(date: TDate, firstDay: number) {
    return getStartOfWeek(date, firstDay).getTime()
}

export function getStartOfWeekAndDayTime(date: TDate, firstDay: number) {
    return getStartOfWeekAndDay(date, firstDay).getTime()
}

export function getEndOfWeekTime(date: TDate, firstDay: number) {
    return getEndOfWeek(date, firstDay).getTime()
}

export function getEndOfWeekAndDayTime(date: TDate, firstDay: number) {
    return getEndOfWeekAndDay(date, firstDay).getTime()
}

export function getStartOfMonth(date: TDate) {
    return startOf(new Date(date), 'month')
}

export function getStartOfMonthTime(date: TDate) {
    return startOf(new Date(date), 'month').getTime()
}

export function getEndOfMonth(date: TDate) {
    return endOf(new Date(date), 'month')
}

export function getEndOfMonthTime(date: TDate) {
    return endOf(new Date(date), 'month').getTime()
}