export default (name: string) => {
  const searchString = new URL(globalThis.location.href).search
  const params = new URLSearchParams(searchString)

  return params.get(name)
}
