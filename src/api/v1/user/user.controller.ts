import {
  Controller,
  Post,
  UsePipes,
  Body,
  Get,
  NotFoundException
} from '@nestjs/common'
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
import {
  UserPostSignupBodyValidation,
  UserPostSignupBodyDto
} from './dto/request/signup.dto'
import { CheckMobileAndEmailPipe } from '../../../pipes/user/check-mobile-and-email.pipe'
import { IsUsernameNotExistPipe } from '../../../pipes/user/is-username-not-exist.pipe copy'

@Controller('api/v1/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signup')
  @UsePipes(
    new JoiValidationPipe({ body: UserPostSignupBodyValidation }),
    CheckMobileAndEmailPipe,
    IsUsernameNotExistPipe
  )
  // @ApiOkResponse({ type: FormatResponseFactory(PersonPostCreateResponseDto) })
  @ApiBadRequestResponse({})
  signup(@Body() body: UserPostSignupBodyDto): Promise<any> {
    //UserPostSignupResponseDto
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

  @Get('/signin')
  @UsePipes(
    // new JoiValidationPipe({ body: UserPostSignupBodyValidation }),
    IsUsernameExistPipe
  )
  // @ApiOkResponse({ type: FormatResponseFactory(PersonPostCreateResponseDto) })
  @ApiBadRequestResponse({})
  async signin(@Body() body: any /*UserPostSignupBodyDto */): Promise<any> {
    //UserPostSignupResponseDto
    const { username, password } = body
    const user = await this.userService.checkPassword(username, password)
    if (!user) {
      throw new NotFoundException('user.not_found')
    }
    return user
  }
}
