import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaveTireDto } from './dto/saveTire.dto';
import { TireDto } from './dto/tire.dto';
import { TireService } from './tire.service';

@Controller('tire')
export class TireController {
  constructor(private tireService: TireService){}
  // 타이어 조회
  @Get()
  @UseGuards(AuthGuard())
  async getTire() {
    
  }

  @Post()
  createTire(@Body() saveTireDto: SaveTireDto[]): Promise<string> {
    return this.tireService.createTire(saveTireDto);
  }

}
