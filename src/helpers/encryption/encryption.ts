import * as bcrypt from 'bcrypt'
const saltRounds = 10

function hash(password) {
  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err)
      }
      resolve(hash)
    })
  })

  return hashedPassword
}

async function encrypt(plainText) {
  const result = await hash(plainText)
  return result
}

export { encrypt }
