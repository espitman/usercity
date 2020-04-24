import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from './schemas/user.schema'
import { encrypt } from '../../helpers/encryption/encryption'

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
}
