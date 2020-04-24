import * as bcrypt from 'bcrypt'
const saltRounds = 10

function hash(password) {
  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, encrypted) => {
      if (err) {
        reject(err)
      }
      resolve(encrypted)
    })
  })
  return hashedPassword
}

async function encrypt(plainText) {
  const result = await hash(plainText)
  return result
}

function compare(plainText, encrypted) {
  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.compare(plainText, encrypted, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
  return hashedPassword
}

async function check(plainText, encrypted) {
  const result = await compare(plainText, encrypted)
  return result
}

export { encrypt, check }
