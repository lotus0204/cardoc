import { Trim } from "src/trim/trim.entity";
import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserTrim } from "./user-trim.entity";

@EntityRepository(UserTrim)
export class UserTrimRepository extends Repository<UserTrim>{
  async saveUserTrim(user: User, trim: Trim) {
    
    const userTrim = await this.create({ user, trim });
    return await this.save(userTrim);
  }
}