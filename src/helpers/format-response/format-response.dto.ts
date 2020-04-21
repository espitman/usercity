import { ApiProperty } from '@nestjs/swagger'

export abstract class FormatResponseDto<T = any> {
  @ApiProperty({
    type: Number,
    default: 200,
    required: true,
    example: 200
  })
  readonly status: number = 200

  @ApiProperty({
    default: 'ok',
    type: String,
    required: true,
    example: 'ok'
  })
  readonly message: string

  abstract payload: T
}
