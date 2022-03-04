import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { TrimModule } from 'src/trim/trim.module';
import { UserTrimRepository } from './user-trim.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTrimRepository])],
  exports:[TypeOrmModule]
})
export class UserTrimModule {}
