import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrimModule } from 'src/trim/trim.module';
import { UserTrimModule } from 'src/user-trim/user-trim.module';
import { UserModule } from 'src/user/user.module';
import { TireController } from './tire.controller';
import { TireRepository } from './tire.repository';
import { TireService } from './tire.service';

@Module({
  providers: [TireService],
  imports: [TypeOrmModule.forFeature([TireRepository]),
    UserModule,
    TrimModule,
    UserTrimModule,
  HttpModule],
  controllers: [TireController],
  exports:[TypeOrmModule]
})
export class TireModule {}
