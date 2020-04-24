import { Controller, Post, UsePipes, Body } from '@nestjs/common'
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBadRequestResponse
} from '@nestjs/swagger'

import { UserService } from '../../../entities/user/user.service'
import { JoiValidationPipe } from '../../../pipes/joi-validation/joi-validation.pipe'
import { FormatResponseFactory } from '../../../helpers/format-response/format-response.factory'
import { IsUsernameExistPipe } from '../../../pipes/user/is-username-exist.pipe'

@Controller('api/v1/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(
    // new JoiValidationPipe({ body: PersonPostCreateBodyValidation }),
    IsUsernameExistPipe
  )
  // @ApiOkResponse({ type: FormatResponseFactory(PersonPostCreateResponseDto) })
  @ApiBadRequestResponse({})
  create(
    @Body() body: any //PersonPostCreateBodyDto
  ): Promise<any> {
    //PersonPostCreateResponseDto
    const { password, fname, lname, email, mobile } = body
    const username = mobile || email
    return this.userService.create(
      username,
      password,
      fname,
      lname,
      email,
      mobile
    )
  }
}
