import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrimRepository } from 'src/trim/trim.repository';
import { UserTrimRepository } from 'src/user-trim/user-trim.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { SaveTireDto } from './dto/saveTire.dto';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
  private readonly logger = new Logger(TireService.name)
  constructor(
    private httpService: HttpService,
    @InjectRepository(TireRepository)
    private tireRepository: TireRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TrimRepository)
    private trimRepository: TrimRepository,
    @InjectRepository(UserTrimRepository)
    private userTrimRepository: UserTrimRepository
  ) { }
    // 타이어 조회
    async getTire(user: User): Promise<any[]> {
      const data = [];
      for (let userTrim of user.userTrims) {
        const userTrimInfo = await this.userTrimRepository.find({
          relations: ['trim'], where: { id: userTrim.id }
        });
        const { trimId, tires } = userTrimInfo[0].trim;
        data.push({
          trimId,
          frontTire: {
            width: tires[0].width,
            ratio: tires[0].ratio,
            wheelSize: tires[0].wheelSize
          },
          rearTire: {
            width: tires[1].width,
            ratio: tires[1].ratio,
            wheelSize: tires[1].wheelSize
          }
        });
      }
      return data;
    }
  
  // 타이어 저장
  async createTire(saveTireDtos: SaveTireDto[]): Promise<string>{
    try {
      // 요청이 5개보다 많을 경우
      if (saveTireDtos.length > 5) return '요청의 개수가 과도합니다.';
      
      for (const saveTireDto of saveTireDtos) {
        const { id, trimId } = saveTireDto;
    
        const user = await this.userRepository.findOne({ username: id });
        let trim = await this.trimRepository.findOne({ trimId });

        // 유저가 없는 경우, 없는 유저를 표시해주고 반복문의 다음으로 넘어간다.
        if (!user) {
          this.logger.log(`${id}는 없는 유저입니다.`)
          continue;
        }
        // trim이 없는 경우, 새로운 trim을 생성하고 진행한다.
        if (!trim) {
          trim = await this.trimRepository.createTrim(trimId);
          const entireTireInfo = await this.getTireInfo(trimId);
          await this.tireRepository.createTire(entireTireInfo, trim);
        }
        // user-Trim에 정보 저장
        await this.userTrimRepository.saveUserTrim(user, trim);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  // 타이어 정보 받아와서 가공하기
  async getTireInfo(trimId: number) {
    let trimInfo
    try {
      trimInfo = await this.httpService.get(`https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`).toPromise();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
    
    const frontTireInfo = trimInfo.data.spec.driving.frontTire.value.split(/[\/|R]/);
    const rearTireInfo = trimInfo.data.spec.driving.rearTire.value.split(/[\/|R]/);

    return {
      frontTire: frontTireInfo,
      rearTire: rearTireInfo
    }
  }
}
