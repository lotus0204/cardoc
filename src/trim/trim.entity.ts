import { Tire } from 'src/tire/tire.entity';
import { UserTrim } from 'src/user-trim/user-trim.entity';
import { User } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Trim extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trimId: number;

  @OneToMany((type) => UserTrim, (userTrim) => userTrim.trim, { eager: true })
  userTrims: UserTrim[]
  
  @OneToMany((type) => Tire, (tire) => tire.trim, { eager: true })
  tires: Tire[];
}