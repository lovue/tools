import padNumber from './padNumber'

export default (num: number, type = 1) => {
  if (num <= 0) return ''

  let days = 0, hours = 0, minutes = 0, seconds = 0
  let hoursText = '', minutesText = '', secondsText = ''

  minutes = Math.trunc(num / 60)
  if (minutes === 0) {
    seconds = num
    secondsText = padNumber(seconds)
    return [`00:00:${secondsText}`, `${seconds}s`, `${seconds}秒`][type - 1]
  }

  seconds = num % 60
  secondsText = padNumber(seconds)
  hours = Math.trunc(minutes / 60)
  if (hours === 0) {
    minutesText = padNumber(minutes)
    return [`00:${minutesText}:${secondsText}`, `${minutes}m${seconds}s`, `${minutes}分${seconds}秒`][type - 1]
  }

  minutes = minutes % 60
  minutesText = padNumber(minutes)
  days = Math.trunc(hours / 24)
  if (days === 0) {
    hoursText = padNumber(hours)
    return [`${hoursText}:${minutesText}:${secondsText}`, `${hours}h${minutes}m${seconds}s`, `${hours}小时${minutes}分${seconds}秒`][type - 1]
  }

  hours = hours % 24
  hoursText = padNumber(hours)
  return [`${days}天 ${hoursText}:${minutesText}:${secondsText}`, `${days}day${hours}h${minutes}m${seconds}s`, `${days}天${hours}小时${minutes}分${seconds}秒`][type - 1]
}
