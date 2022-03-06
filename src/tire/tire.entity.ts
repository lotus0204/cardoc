import { Trim } from 'src/trim/trim.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class Tire extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  ratio: number;

  @Column()
  wheelSize: number;

  @Column()
  type: tireType;
  
  @ManyToOne((type) => Trim, (trim) => trim.tires)
  @JoinColumn({ name: 'trim_id' })
  trim: Trim;
}

export enum tireType{
  FRONT,
  REAR,
}