export default (value: number, length = 2) => {
  return ('' + value).padStart(length, '0')
}
