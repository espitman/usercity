import { ApiProperty } from '@nestjs/swagger'
import Joi from '../../../../../helpers/joi/joi'

export class UserGetSigninBodyDto {
  @ApiProperty()
  readonly password: string = Joi.string()
    .min(8)
    .required()

  @ApiProperty()
  readonly username: string = Joi.string()
    .min(3)
    .required()
}

export const UserGetSigninBodyValidation = Joi.object(
  new UserGetSigninBodyDto()
)
