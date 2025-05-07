import isEmpty from './isEmpty.js'

function parse(cookie: string) {
  const result: Record<string, string> = {}

  cookie.split(';').forEach((entry) => {
    const info = entry.split('=')
    result[info[0].trim()] = info[1]
  })

  return result
}

export default (cookie: string, name: string) => {
  if (isEmpty(cookie)) return ''
  return parse(cookie)[name]
}
