import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException
} from '@nestjs/common'

@Injectable()
export class CheckMobileAndEmailPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata
    if (type !== 'body') {
      return value
    }
    const { mobile, email } = value
    if (!mobile && !email) {
      throw new BadRequestException('user.enter_email_or_mobile')
    }
    return value
  }
}
