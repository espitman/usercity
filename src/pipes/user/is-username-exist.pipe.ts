import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { UserService } from '../../entities/user/user.service'
import { NotFoundException } from '../../exceptions/not-found.exception'

@Injectable()
export class IsUsernameExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (type !== 'body') {
      return value
    }
    const { username } = value
    const isExist = await this.userService.isExist({ username })
    if (!isExist) {
      throw new NotFoundException('user.not_found')
    }
    return value
  }
}
