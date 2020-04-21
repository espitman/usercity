import { HttpException, HttpStatus } from '@nestjs/common'

export class NotFoundException extends HttpException {
  constructor(message = '', payload = {}) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        message,
        payload
      },
      HttpStatus.NOT_FOUND
    )
  }
}
