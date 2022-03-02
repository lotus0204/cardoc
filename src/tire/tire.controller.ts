import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TireDto } from './dto/tire.dto';
import { TireService } from './tire.service';

@Controller('tire')
@UseGuards(AuthGuard())
export class TireController {
  constructor(private tireService: TireService){}
  // 타이어 조회
  @Get()
  async getTire() {
    
  }

  @Post()
  createTire(@Body() tireDto:TireDto): Promise<string> {
    return this.tireService.createTire(tireDto);
  }

}
