export default (arr: unknown[], column: string, dir = 1) => {
  arr.sort((a, b) => {
    if (typeof a[column] === 'number') return dir > 0 ? (a[column] - b[column]) : (b[column] - a[column])

    return new globalThis.Intl.Collator(/*'zh-Hans-CN', */undefined, {
      sensitivity: 'base'
    }).compare(dir > 0 ? a[column] : b[column], dir > 0 ? b[column] : a[column])
  })
  return arr
}
