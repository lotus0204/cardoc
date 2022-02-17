import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  
  @Post('/signup')
  signup(@Body() userDto: UserDto): Promise<string>{
    return this.userService.signup(userDto);
  }

  @Post('/signin')
  signin(@Body() userDto: UserDto): Promise<{ accessToken: string }>{
    return this.userService.signin(userDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@Req() req) {
  //   console.log('11111', req.user);
  // }
}
