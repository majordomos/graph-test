import { Controller, UseGuards, Post, Req, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ISignInResponse } from "./auth.service.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard("local"))
  // // @Post("login")
  // // async login(@Req() req) {
  // //   return this.authService.login(req.user);
  // // }

  // @UseGuards(AuthGuard("google"))
  // @Get("google")
  // async signInWithGoogle() {}

  // @UseGuards(AuthGuard("google"))
  // @Get("google/redirect")
  // async signInWithGoogleRedirect(@Req() req) {
  //   return this.authService.signInWithGoogle(req);
  // }

  @Post("login")
  async login(@Req() req): Promise<ISignInResponse> {
    return this.authService.signIn(req.body);
  }
}