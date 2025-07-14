export const dateTimeFormatter = new Intl.DateTimeFormat('zh-CN', {
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})
export const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function toLocaleDatetime(date: Date | string | number, formatter?: Intl.DateTimeFormat) {
  return (formatter ?? dateTimeFormatter).format(date instanceof Date ? date : new Date(date)).replaceAll('/', '-')
}
export function toLocaleDate(date: Date | string | number, formatter?: Intl.DateTimeFormat) {
  return (formatter ?? dateFormatter).format(date instanceof Date ? date : new Date(date)).replaceAll('/', '-')
}
