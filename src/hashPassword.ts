import crypto from 'node:crypto'

export default (password: string, salt: string) => {
  return crypto.pbkdf2Sync(password, Buffer.from(salt, 'base64'), 10000, 64, 'sha512').toString('hex')
}
