import type { JwtPayload } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';

export type iAuthPayload = {
    googleToken: string;
}

export type ISignInResponse = {
    user: User;
    token: string;
};

export interface IAuthService {
    signIn(authPayload: iAuthPayload): Promise<ISignInResponse>;
    verifyJwt(token: string): JwtPayload | false;
}