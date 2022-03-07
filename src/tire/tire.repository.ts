import { Trim } from 'src/trim/trim.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Tire, tireType } from './tire.entity';

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire>{
  async createTire(entiretireInfo: any, trim: Trim): Promise<void>{
    const { frontTire, rearTire } = entiretireInfo;
    
    // frontTire 생성 및 저장
    const frontTireInfo = await this.create({
      width: Number(frontTire[0]),
      ratio: Number(frontTire[1]),
      wheelSize: Number(frontTire[2]),
      type: tireType.FRONT,
      trim:trim
    })
    await this.save(frontTireInfo)

    // rearTire 생성 및 저장
    const rearTireInfo = await this.create({
      width: Number(rearTire[0]),
      ratio: Number(rearTire[1]),
      wheelSize: Number(rearTire[2]),
      type: tireType.REAR,
      trim:trim
    })
    await this.save(rearTireInfo);
  }
}