import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }
  // 회원가입
  async signup(userDto: UserDto): Promise<string>{
    await this.userRepository.createUser(userDto);
    return '회원 가입이 완료 되었습니다.';
  }

  // 로그인
  async signin(userDto: UserDto): Promise<{accessToken:string}>{
    const { username, password } = userDto;
    const user = await this.userRepository.findOne({ username });

    if (!user) throw new UnauthorizedException('유저네임이 잘못되었거나, 존재하지 않는 유저입니다.');
    else if (await bcrypt.compare(password, user.password)) {
      // 토큰 생성
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      
      return {accessToken};
    }
    else throw new UnauthorizedException('비밀번호가 틀렸습니다.');
  }
}
