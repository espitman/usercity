import {
  Controller,
  Post,
  UsePipes,
  Body,
  Get,
  NotFoundException,
  Param
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
import { sign, verify } from '../../../helpers/jwt/jwt'
import {
  UserGetSigninBodyValidation,
  UserGetSigninBodyDto
} from './dto/request/signin.dto'
import {
  UserGetVerifyParamValidation,
  UserGetVerifyParamDto
} from './dto/request/verify.dto'
import { UserPostSignupResponseDto } from './dto/response/signup.dto'
import { UserPostSigninResponseDto } from './dto/response/signin.dto'
import { UserPostVerifyUserDto } from './dto/response/verify.dto'

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
  @ApiOkResponse({ type: FormatResponseFactory(UserPostSignupResponseDto) })
  @ApiBadRequestResponse({})
  async signup(
    @Body() body: UserPostSignupBodyDto
  ): Promise<UserPostSignupResponseDto> {
    const { password, fname, lname, email, mobile } = body
    const username = mobile || email
    const user = await this.userService.create(
      username,
      password,
      fname,
      lname,
      email,
      mobile
    )
    return user.toObject()
  }

  @Get('/signin')
  @UsePipes(
    new JoiValidationPipe({ body: UserGetSigninBodyValidation }),
    IsUsernameExistPipe
  )
  @ApiOkResponse({ type: FormatResponseFactory(UserPostSigninResponseDto) })
  @ApiBadRequestResponse({})
  async signin(
    @Body() body: UserGetSigninBodyDto
  ): Promise<UserPostSigninResponseDto> {
    const { username, password } = body
    const user = await this.userService.checkPassword(username, password)
    if (!user) {
      throw new NotFoundException('user.not_found')
    }
    const token = sign(user)
    const result = {
      ...user,
      token
    }
    return result
  }

  @Get('/verify/:token')
  @UsePipes(
    new JoiValidationPipe({ params: UserGetVerifyParamValidation }),
    IsUsernameExistPipe
  )
  @ApiOkResponse({ type: FormatResponseFactory(UserPostVerifyUserDto) })
  @ApiBadRequestResponse({})
  async verify(
    @Param() param: UserGetVerifyParamDto
  ): Promise<UserPostVerifyUserDto> {
    const { token } = param
    try {
      return verify(token) as UserPostVerifyUserDto
    } catch (error) {
      throw new NotFoundException('user.not_found')
    }
  }
}
