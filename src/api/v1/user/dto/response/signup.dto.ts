import { ApiProperty } from '@nestjs/swagger'

export class UserPostSignupResponseDto {
  @ApiProperty({ format: 'objectId' })
  // tslint:disable-next-line: variable-name
  readonly _id: string

  @ApiProperty()
  readonly username: string

  @ApiProperty()
  readonly password: string

  @ApiProperty()
  readonly fname: string

  @ApiProperty()
  readonly lname: string

  @ApiProperty()
  readonly email?: string

  @ApiProperty()
  readonly mobile?: string
}
