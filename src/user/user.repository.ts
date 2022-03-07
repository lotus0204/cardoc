import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { UserDto } from "./dto/user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  // 유저생성
  async createUser(userDto: UserDto): Promise<void>{
    const { username, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = this.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (err) {
      if (err.errno === 19) throw new ConflictException('같은 이름의 유저가 존재합니다.');
      else throw new InternalServerErrorException();
    }
  }
}