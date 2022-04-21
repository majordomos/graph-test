import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PointModule } from './point/point.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleAuthService } from './google-auth/google-auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PointModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, GoogleAuthService],
})
export class AppModule {}
