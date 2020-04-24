import * as jwt from 'jsonwebtoken'
import * as config from 'config'

const privateKey = config.get('jwt.privateKey') as string
const expiresIn = config.get('jwt.expiresIn') as number

function sign(data) {
  return jwt.sign({ data }, privateKey, { expiresIn })
}

function verify(token) {
  return jwt.verify(token, privateKey)
}

export { sign, verify }
