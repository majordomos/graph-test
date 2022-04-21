import { Controller, UseGuards, Post, Req, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ISignInResponse } from "./auth.service.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post("login")
  async login(@Req() req): Promise<ISignInResponse> {
    return this.authService.signIn(req.body);
  }
}