export function timeInterval(timeString: string) {
  const last = new Date(timeString)
  const now = new Date()
  const interval = now.getTime() - last.getTime()
  const year = 86400 * 1000 * 365
  const month = 86400 * 1000 * 30
  const day = 86400 * 1000
  const hour = 60 * 60 * 1000
  const minute = 60 * 1000
  let result = ''
  if (interval >= year) {
    result = `${Math.floor(interval/year)}年前`
  } else if (interval < year && interval >= month) {
    result = `${Math.floor(interval/month)}月前`
  } else if (interval < month && interval >= day) {
    result = `${Math.floor(interval/day)}天前`
  } else if (interval < day && interval >= hour) {
    result = `${Math.floor(interval/hour)}小时前`
  } else if (interval < hour && interval >= minute) {
    result = `${Math.floor(interval/minute)}分钟前`
  } else if (interval < minute) {
    result = '刚刚'
  }
  return result
}