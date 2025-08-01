import isEmpty from './isEmpty.js'

export function getSearchParam(name: string, url?: string) {
  const searchString = new globalThis.URL(url || globalThis.location.href).search
  const params = new globalThis.URLSearchParams(searchString)

  return params.get(name)
}

export function getQueryString(queries: Record<string, string>, allowNull?: boolean) {
  const _queries = {}

  for (const queriesKey in queries) {
    if (isEmpty(queries[queriesKey])) {
      if (!allowNull) continue
      if (queries[queriesKey] !== null) continue
    }

    _queries[queriesKey] = queries[queriesKey]
  }

  return new globalThis.URLSearchParams(_queries).toString()
}
