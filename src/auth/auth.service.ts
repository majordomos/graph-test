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
  //   async validateUser(username: string, password: string): Promise<User | null> {
  //     console.log(`LOOK HERE1 - ${{username}}`);
  //     const user = (await this.userService.getByEmail(username));
  //     if (user && user.password === password) return user;
  //     return null;
  // }
  
  //   async login(user: User) {
  //     console.log(`LOOK HERE2 - ${user.email}`);
  //     return {
  //       access_token: this.jwtService.sign(
  //         {
  //           sub: user.id,
  //           email: user.email,
  //         },
  //         {
  //           secret: process.env.JWT_SECRET,
  //           expiresIn: process.env.JWT_EXPIRE_TIME,
  //         }
  //       ),
  //     };
  //   }
  
  //   async signInWithGoogle(data) {
  //     if (!data.user) throw new BadRequestException();
  //     if (data.user){
  //       console.log(`LOOK HERE3 - ${data.user}`);
  //       console.log(`LOOK HERE4 - ${data.user.email}`);
  //       console.log(JSON.stringify(data.user));
  //     }
  //     let user = (
  //       await this.userService.getByEmail(data.user.email)
  //     );
  //     if (user) return this.login(user);
  
  //     if (user)
  //       throw new ForbiddenException(
  //         "User already exists, but Google account was not connected to user's account"
  //       );
  
  //     try {
  //       const newUser = new User();
  //       newUser.firstName = data.user.firstName;
  //       newUser.lastName = data.user.lastName;
  //       newUser.email = data.user.email;
  
  //       await this.userService.create(newUser);
  //       return this.login(newUser);
  //     } catch (e) {
  //       throw new Error(e);
  //     }
  //   }

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
      console.log(accessToken)
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