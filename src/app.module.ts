import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PointModule } from './point/point.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PointModule,
    UserModule,
    AuthModule,
    GoogleAuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
