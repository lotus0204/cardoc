import { Trim } from 'src/trim/trim.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TireDto } from './dto/tire.dto';
import { Tire, tireType } from './tire.entity';

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire>{
  async createTire(entiretireInfo: any, trim: Trim): Promise<void>{
    // let { width, ratio, wheelSize, type } = tireDto;
    // let tire = this.create({
    //   width, ratio, wheelSize, type
    // });
    // await this.save(tire);
    // console.log(trim.trimId)
    const { frontTire, rearTire } = entiretireInfo;
    // console.log('1111',frontTire);
    // console.log('22222', rearTire)
//     1111 [ '225', '60', '16' ]
//  22222 [ '225', '60', '16' ]
    // const frontTireInfo = {
    //   width: Number(frontTire[0]),
    //   ratio: Number(frontTire[1]),
    //   wheelSize: Number(frontTire[2]),
    // }
    const frontTireInfo = await this.create({
      width: Number(frontTire[0]),
      ratio: Number(frontTire[1]),
      wheelSize: Number(frontTire[2]),
      type: tireType.FRONT,
      trim:trim
    })
    await this.save(frontTireInfo)

    const rearTireInfo = await this.create({
      width: Number(rearTire[0]),
      ratio: Number(rearTire[1]),
      wheelSize: Number(rearTire[2]),
      type: tireType.REAR,
      trim:trim
    })
    await this.save(rearTireInfo);
    // console.log(frontTireInfo)
    // { width: 225, ratio: 60, wheelSize: 16 }
  }
}