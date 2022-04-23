const YEAR = 31536e6
const MONTH = 2592e6
const DAY = 864e5
const HOUR = 36e5
const MINUTE = 6e4

function diff(start: string) {
  const last = new Date(start)
  const now = new Date()
  return now.getTime() - last.getTime()
}

export function timeInterval(timeString: string) {
  const interval = diff(timeString)
  let result = ''

  if (interval < MINUTE) {
    result = '刚刚'
  } else if (interval < HOUR && interval >= MINUTE) {
    result = `${Math.floor(interval / MINUTE)}分钟前`
  } else if (interval < DAY && interval >= HOUR) {
    result = `${Math.floor(interval / HOUR)}小时前`
  } else if (interval < MONTH && interval >= DAY) {
    result = `${Math.floor(interval / DAY)}天前`
  } else if (interval < YEAR && interval >= MONTH) {
    result = `${Math.floor(interval / MONTH)}月前`
  } else {
    result = `${Math.floor(interval / YEAR)}年前`
  }
  return result
}

const ZHI = '子丑寅卯辰巳午未申酉戌亥'

export function yearToDiZhi(year: number): string {
  return ZHI[(year - 4) % 12]
}
