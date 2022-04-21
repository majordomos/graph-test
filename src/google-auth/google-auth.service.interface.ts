import { TokenPayload } from 'google-auth-library';

export interface IGoogleAuthService {
    verifyJwt(googleToken: string): Promise<TokenPayload>;
}