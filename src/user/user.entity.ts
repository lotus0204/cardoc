import { UserTrim } from 'src/user-trim/user-trim.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => UserTrim, (userTrim) => userTrim.user, { eager: true })
  userTrims: UserTrim[]
}
