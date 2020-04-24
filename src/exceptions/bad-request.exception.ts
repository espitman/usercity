import { HttpException, HttpStatus } from '@nestjs/common'

export class BadRequestException extends HttpException {
  constructor(message = '', payload = {}) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message,
        payload
      },
      HttpStatus.BAD_REQUEST
    )
  }
}
