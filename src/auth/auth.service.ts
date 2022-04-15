import {
    Injectable,
    BadRequestException,
    ForbiddenException,
  } from "@nestjs/common";
  import { UserService } from "../user/user.service";
  import { User } from "../model/user.entity";
  import { JwtService } from "@nestjs/jwt";
  
  @Injectable()
  export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) {}
  
    async login(user: User) {
      return {
        access_token: this.jwtService.sign(
          {
            sub: user.id,
            email: user.email,
          },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRE_TIME,
          }
        ),
      };
    }
  
    async signInWithGoogle(data) {
      if (!data.user) throw new BadRequestException();
      // if (data.user){
      //   console.log(`LOOK HERE - ${data.user}`);
      //   console.log(`LOOK HERE - ${data.user.email}`);
      //   console.log(JSON.stringify(data.user));
      // }
      let user = (
        await this.userService.getByEmail(data.user.email)
      );
      if (user) return this.login(user);
  
      if (user)
        throw new ForbiddenException(
          "User already exists, but Google account was not connected to user's account"
        );
  
      try {
        const newUser = new User();
        newUser.firstName = data.user.firstName;
        newUser.lastName = data.user.lastName;
        newUser.email = data.user.email;
  
        await this.userService.create(newUser);
        return this.login(newUser);
      } catch (e) {
        throw new Error(e);
      }
    }
  }