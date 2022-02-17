import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["username"])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;
}
// 데이터베이스의 테이블이 되는 것이 엔티티다.
// 유니크한 이름을 주기 위해, 일부러 데이터베이스의 findeOne을 사용하는 것보다는 entity에서
// 유니크를 해줘버리는 것이 좋아 => 한번의 디비작업이 편하니깐