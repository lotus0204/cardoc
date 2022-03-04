// import { Trim } from "src/trim/trim.entity";
// import { User } from "src/user/user.entity";
// import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class UserTrim extends BaseEntity{
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne((type) => User, (user) => user.userTrims)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @ManyToOne((type) => Trim, (trim) => trim.userTrims)
//   @JoinColumn({ name: 'trim_id' })
//   trim: Trim;
// }
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Trim } from '../trim/trim.entity';

@Entity()
export class UserTrim {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => User, (user) => user.userTrims)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne((type) => Trim, (trim) => trim.userTrims)
  @JoinColumn({ name: 'trim_id' })
  trim: Trim;
}
