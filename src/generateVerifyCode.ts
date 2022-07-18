export default (codeLength = 6) => {
  const chars = '0123456789'
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    code += chars[Math.trunc(Math.random() * 10)]
  }

  return code
}
