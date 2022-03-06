import { HttpService } from '@nestjs/axios';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert/strict';
import { TrimRepository } from 'src/trim/trim.repository';
import { UserTrimRepository } from 'src/user-trim/user-trim.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { SaveTireDto } from './dto/saveTire.dto';
import { TireDto } from './dto/tire.dto';
import { TireRepository } from './tire.repository';

@Injectable()
export class TireService {
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
  async createTire(saveTireDtos: SaveTireDto[]): Promise<string>{
    try {
      // console.log('11111111111')
      for (const saveTireDto of saveTireDtos) {
        const { id, trimId } = saveTireDto;
    
        const user = await this.userRepository.findOne({ username: id });
        // console.log('3333333',user)
        const trim = await this.trimRepository.findOne({ trimId });

        
        if (!user) return 'err';
        if (!trim) {
      // 1.trim생성하고 userTrim에 저장 2. api요청 3.받은데이터가공 4.타이어 저장
        
        const createdTrim = await this.trimRepository.createTrim(trimId);
          await this.userTrimRepository.saveUserTrim(user, createdTrim);
          const entiretireInfo = await this.findTireInfo(trimId);
          await this.tireRepository.createTire(entiretireInfo, trim);
          // 지금부터 생각해야하는 것. 타이어를 저장할 때 트림아이디를 보내주는 것이다.
          // 그리고 타이어제대로 저장하기 위해서 타이어엔티티 확인하고 그거에 맞게 타이어를 저장할 수 있어야 해.
          
        }
        // const createdTrim = await this.trimRepository.createTrim(trimId);
        // console.log(createdTrim)
          await this.userTrimRepository.saveUserTrim(user, trim);
        const entiretireInfo = await this.findTireInfo(trimId);
          await this.tireRepository.createTire(entiretireInfo, trim);
    await this.userTrimRepository.saveUserTrim(user, trim);
      }
    } catch (err) {
      console.log(err);
    }

  }
  // 타이어 정보 받아와서 가공하기
  async findTireInfo(trimId:number){
    const trimInfo = await this.httpService.get(`https://dev.mycar.cardoc.co.kr/v1/trim/${trimId}`).toPromise();
    const frontTireInfo = trimInfo.data.spec.driving.frontTire.value.split(/[\/|R]/);
    const rearTireInfo = trimInfo.data.spec.driving.rearTire.value.split(/[\/|R]/);

    return {
      frontTire: frontTireInfo,
      rearTire: rearTireInfo
    }
  }
  // 타이어 조회하기
  async getTire(user: User) {
    // console.log(user.userTrims);
    const data = [];
    for (let userTrim of user.userTrims) {
      const a = await this.userTrimRepository.find({ relations: ['trim'], where: { id:userTrim.id } });
      const { trimId, tires } = a[0].trim;
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
      })
      // console.log(a[0].trim);
      // console.log(a[0].trim.tires[1]);

    }
    return data;
  }
}
// 같은 것이 있으면 안넣어줘야하나, 아니면 구분을 해서 넣어줘야 하는 것인가.
// try catch
// 예외처리
// 리턴데이터 형식
// 전체 흐름 속에서 제대로된 처리 생각하기
// 