import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaveTireDto } from './dto/saveTire.dto';
import { TireService } from './tire.service';

@Controller('tire')
@UseGuards(AuthGuard())
export class TireController {
  constructor(private tireService: TireService){}
  // 타이어 조회
  @Get()
  async getTire(@Req() req): Promise<any[]> {
    return await this.tireService.getTire(req.user);
  }

  // 타이어 저장
  @Post()
  async createTire(@Body() saveTireDto: SaveTireDto[]) {
    return await this.tireService.createTire(saveTireDto);
  }
}
