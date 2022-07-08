export default (name: string, url?: string) => {
  const searchString = new globalThis.URL(url || globalThis.location.href).search
  const params = new globalThis.URLSearchParams(searchString)

  return params.get(name)
}
