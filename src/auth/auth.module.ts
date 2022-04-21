import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategies/local-strategy';
import { JwtModule } from '@nestjs/jwt';
// import { GoogleStrategy } from './strategies/google-strategy';
import { UserModule } from '../user/user.module';
// import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [UserModule, /*PassportModule,*/ JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,/* LocalStrategy, JwtStrategy, GoogleStrategy*/]
})
export class AuthModule { }