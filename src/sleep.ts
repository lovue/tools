export default (ms = 1000) => {
  return new globalThis.Promise(resolve => globalThis.setTimeout(resolve, ms))
}
