import { EntityRepository, Repository } from 'typeorm';
import { TireDto } from './dto/tire.dto';
import { Tire } from './tire.entity';

@EntityRepository(Tire)
export class TireRepository extends Repository<Tire>{
  async createTire(tireDto: TireDto): Promise<void>{
    let { width, ratio, wheelSize, type } = tireDto;
    let tire = this.create({
      width, ratio, wheelSize, type
    });
    await this.save(tire);
  }
}