import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TireController } from './tire.controller';
import { TireRepository } from './tire.repository';
import { TireService } from './tire.service';

@Module({
  providers: [TireService],
  imports: [TypeOrmModule.forFeature([TireRepository]),
  UserModule],
  controllers: [TireController]
})
export class TireModule {}
