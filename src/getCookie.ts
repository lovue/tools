import isEmpty from './isEmpty.js'

function parse (cookie: string) {
  const result = {}

  cookie.split(';').forEach(entry => {
    const info = entry.split('=')
    result[info[0].trim()] = info[1]
  })

  return result
}

export default function (cookie: string, name: string): string {
  if (isEmpty(cookie)) return ''
  return parse(cookie)[name]
}
