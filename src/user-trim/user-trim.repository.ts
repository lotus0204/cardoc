import { Trim } from "src/trim/trim.entity";
import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserTrim } from "./user-trim.entity";

@EntityRepository(UserTrim)
export class UserTrimRepository extends Repository<UserTrim>{
  async saveUserTrim(user: User, trim: Trim):Promise<void> {
    const userTrim = await this.create({ user, trim });
    await this.save(userTrim);
  }
}