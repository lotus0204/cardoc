import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TireDto } from './dto/tire.dto';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
  constructor(
    @InjectRepository(TireRepository)
    private tireRepository: TireRepository
  ) { }
  async createTire(tireDto: TireDto): Promise<string>{
    let { width, ratio, wheelSize, type } = tireDto;
    await this.tireRepository.createTire(tireDto);
    return String(width);
  }
  
}
