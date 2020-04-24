import { ApiProperty } from '@nestjs/swagger'
import Joi from '../../../../../helpers/joi/joi'

export class UserGetVerifyParamDto {
  @ApiProperty()
  readonly token: string = Joi.string().required()
}

export const UserGetVerifyParamValidation = Joi.object(
  new UserGetVerifyParamDto()
)
