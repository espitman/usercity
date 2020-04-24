import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from './schemas/user.schema'
import { encrypt, check } from '../../helpers/encryption/encryption'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: UserModel
  ) {}

  async create(
    username: string,
    password: string,
    fname: string,
    lname: string,
    email?: string,
    mobile?: string
  ) {
    return this.userModel.create({
      username,
      password: await encrypt(password),
      fname,
      lname,
      email,
      mobile
    })
  }

  async isExist(param) {
    const count = await this.userModel.countDocuments(param)
    return !!count
  }

  async checkPassword(username: string, password: string) {
    const user = await this.userModel.findOne({ username })
    const { _id, fname, lname, password: encrypted } = user
    const isPasswordCorrect = await check(password, encrypted)
    if (!isPasswordCorrect) {
      return false
    }
    return { _id, fname, lname, username }
  }

}
