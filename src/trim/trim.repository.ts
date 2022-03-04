import { EntityRepository, Repository } from 'typeorm';
import { Trim } from './trim.entity';

@EntityRepository(Trim)
export class TrimRepository extends Repository<Trim> {
  async createTrim(trimId: number): Promise<Trim> {
    const trim = await this.create({ trimId });
    await this.save(trim);

    return trim;
  }
}