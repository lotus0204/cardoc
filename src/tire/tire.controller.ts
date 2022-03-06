import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  async getTire(@Req() req) {
    // console.log(req.user);
    return this.tireService.getTire(req.user);
    
  }

  @Post()
  createTire(@Body() saveTireDto: SaveTireDto[]): Promise<string> {
    return this.tireService.createTire(saveTireDto);
  }

}
