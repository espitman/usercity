import { ApiProperty } from '@nestjs/swagger'

export class UserPostVerifyUserDto {
  @ApiProperty({ format: 'objectId' })
  // tslint:disable-next-line: variable-name
  readonly _id: string

  @ApiProperty()
  readonly username: string

  @ApiProperty()
  readonly fname: string

  @ApiProperty()
  readonly lname: string

  @ApiProperty()
  readonly email?: string

  @ApiProperty()
  readonly mobile?: string
}

export class UserPostVerifyResponseDto {
  @ApiProperty()
  readonly data: UserPostVerifyUserDto

  @ApiProperty()
  readonly iat: number

  @ApiProperty()
  readonly exp: number
}
