import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeormconfig';
import { UserModule } from './user/user.module';
import { TrimModule } from './trim/trim.module';
import { TireController } from './tire/tire.controller';
import { TireModule } from './tire/tire.module';
import { UserTrimModule } from './user-trim/user-trim.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TrimModule,
    TireModule,
    UserTrimModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
