import { User } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Trim extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trimId: number;

  @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}