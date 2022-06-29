export default (name: string) => {
  const searchString = new globalThis.URL(globalThis.location.href).search
  const params = new globalThis.URLSearchParams(searchString)

  return params.get(name)
}
