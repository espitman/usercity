import * as jwt from 'jsonwebtoken'

const privateKey = 'boum.golah.2020'
const expiresIn =  1 * 24 * 3600

function sign(data) {
  return jwt.sign({ data }, privateKey, { expiresIn })
}

function verify(token) {
  return jwt.verify(token, privateKey)
}

export { sign, verify }
