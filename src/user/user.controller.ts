import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  // 회원가입
  @Post('/signup')
  signup(@Body() userDto: UserDto): Promise<string>{
    return this.userService.signup(userDto);
  }

  // 로그인
  @Post('/signin')
  signin(@Body() userDto: UserDto): Promise<{ accessToken: string }>{
    return this.userService.signin(userDto);
  }
}
