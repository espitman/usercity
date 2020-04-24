import { ApiProperty } from '@nestjs/swagger'

export class UserPostSigninResponseDto {
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

  @ApiProperty()
  readonly token: string
}
