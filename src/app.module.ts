import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeormconfig';
import { UserModule } from './user/user.module';
import { TrimModule } from './trim/trim.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TrimModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
