import { ApiProperty } from '@nestjs/swagger'
import Joi from '../../../../../helpers/joi/joi'

export class UserPostSignupBodyDto {
  @ApiProperty()
  readonly password: string = Joi.string().min(8).required()

  @ApiProperty()
  readonly fname: string = Joi.string().required()

  @ApiProperty()
  readonly lname: string = Joi.string().required()

  @ApiProperty()
  readonly email: string = Joi.string().email()

  @ApiProperty()
  readonly mobile: string = Joi.string().min(10)

}

export const UserPostSignupBodyValidation = Joi.object(
  new UserPostSignupBodyDto()
)
