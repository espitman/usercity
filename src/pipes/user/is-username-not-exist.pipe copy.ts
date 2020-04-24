import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { UserService } from '../../entities/user/user.service'
import { BadRequestException } from '../../exceptions/bad-request.exception'

@Injectable()
export class IsUsernameNotExistPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (type !== 'body') {
      return value
    }
    const { mobile, email } = value
    const username = mobile || email
    const isExist = await this.userService.isExist({ username })
    if (isExist) {
      throw new BadRequestException('user.duplicated')
    }
    return value
  }
}
