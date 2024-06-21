type TDate = string | number | Date

export function getRandomInt (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomFloat (min: number, max: number, precision: number) {
    return min + Number((Math.random() * (max - min + 1)).toFixed(precision))
}

export function getRandomArray<T> (length: number, creator: () => T) {
    let arr: T[] = []

    for (let x = 0; x < length; x++) {
        arr.push(creator())
    }

    return arr
}

export function getRandomArrayElement<T> (arr: T[]): T {
    let i = getRandomInt(0, arr.length - 1)
    return arr[i]
}

export function getRandomArrayElements<T> (arr: T[], count: number): T[] {
    count = count || getRandomInt(0, arr.length - 1)

    const res: T[] = []

    for (let i = 0; i < count; i++) {
        let idx = getRandomInt(0, arr.length - 1)
        res.push(arr[idx])
    }

    return res
}

function getRandomTimeObj (hStart = 8, hEnd = 18, mArray: number[], sArray: number[]) {
    let hoursDirty = getRandomInt(hStart, hEnd)
    let hours = Math.min(hoursDirty, 23)
    let minutes = mArray ? getRandomArrayElement(mArray) : getRandomInt(0, 59)
    let seconds = sArray ? getRandomArrayElement(sArray) : getRandomInt(0, 59)

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

export function getRandomDay (month, year, endDay, startDay = 1) {
    endDay = endDay || daysInMonth(month, year)
    return getRandomInt(startDay, endDay)
}

export function daysInMonth (month: number, year: number) {
    return new Date(year, month, 0).getDate()
}

export function getRandomDate (startDate: TDate, endDate: TDate) {
    const d = (
        new Date(endDate).getTime()
        - new Date(startDate).getTime()
    )

    return new Date(
        new Date(startDate).getTime()
        + (d - getRandomInt(0, d/2))
    )
}