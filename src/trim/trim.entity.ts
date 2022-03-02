import { Tire } from 'src/tire/tire.entity';
import { User } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Trim extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  trimId: number;

  @ManyToMany(() => User)
    @JoinTable()
  users: User[];
  
  @OneToMany((type) => Tire, (tire) => tire.trim, { eager: true })
  tires: Tire[];
}