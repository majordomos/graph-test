import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { iAuthPayload, ISignInResponse } from "./auth.service.interface";
import { GoogleAuthService } from "../google-auth/google-auth.service";


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private googleService: GoogleAuthService,
  ) {}
  async signIn(authPayload: iAuthPayload): Promise<ISignInResponse>{
    const { googleToken } = authPayload;

    if (!googleToken){
      throw new BadRequestException('googleToken is required.');
    }
    let googleTokenData;
    try {
      googleTokenData = await this.googleService.verifyJwt(googleToken);
    } catch(error) {
      console.log(`${{
        message: `googleAuthService.verifyJwt() threw new error`,
        error: error.stack,
      }}`);
    }
    const {
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
      email,
      picture: pictureUrl,
      hd: hostDomain,
    } = googleTokenData;

    if(!email || !firstName) {
      throw new BadRequestException('Email and first name are required.')
    }
    const allowedDomain = process.env.ALLOWED_GOOGLE_DOMAIN;
    if(hostDomain !== allowedDomain){
      throw new BadRequestException(`Sign in is allowed only for the @${allowedDomain} domain.`)
    }

    let user: User;
    try{
      user = await this.userService.getByEmail(email);
    } catch(error) {
      console.log(error);
    };
    if (!user){
      user = await this.userService.create({
        googleId,
        firstName,
        lastName,
        email,
        pictureUrl
      });
    }
    const accessToken = this.signJWT(user);
    return {
      user,
      token: accessToken,
    };
  }

  signJWT(payload: unknown): string {
    const jwtSecret = process.env.JWT_SECRET;
    return this.jwtService.sign(
      {
        payload,
      },{
        secret: jwtSecret
      }
    );
  }

  verifyJwt(token: string): JwtPayload | false {
    if(!token) return false;
    try{
      const jwtSecret = process.env.JWT_SECRET as Secret;
      return jwt.verify(token, jwtSecret) as JwtPayload;
    } catch(error) {
      return false;
    }
  }
}