import isEmpty from './isEmpty.js'

export function getSearchParam(name: string, url?: string) {
  const searchString = new globalThis.URL(url || globalThis.location.href).search
  const params = new globalThis.URLSearchParams(searchString)

  return params.get(name)
}

export function getQueryString(queries: Record<string, string>) {
  const _queries = {}

  for (const queriesKey in _queries) {
    if (isEmpty(_queries[queriesKey])) continue

    _queries[queriesKey] = queries[queriesKey]
  }

  return new globalThis.URLSearchParams(_queries).toString()
}
