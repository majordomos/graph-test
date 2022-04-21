import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { GoogleAuthService } from '../google-auth/google-auth.service';

@Module({
  imports: [UserModule, ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService,]
})
export class AuthModule { }