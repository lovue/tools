export default (min: number, max: number) => {
  return new Array(max - min + 1).fill(0).map((v, i) => (min + i))
}
