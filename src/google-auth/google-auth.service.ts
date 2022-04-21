import { Injectable } from '@nestjs/common';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { IGoogleAuthService } from './google-auth.service.interface';
require('dotenv').config();

@Injectable()
export class GoogleAuthService implements IGoogleAuthService {
    async verifyJwt(googleToken: string): Promise<TokenPayload>{
        const googleClientId = process.env.GOOGLE_CLIENT_ID;
        const googleClient = new OAuth2Client(googleClientId);
        let ticket: LoginTicket;
        try{
            ticket = await googleClient.verifyIdToken({
                idToken: googleToken,
                audience: googleClientId,
            })
        } catch(error) {
            console.log(`Invalid verity method - ${ticket}`);
            console.log(`Error - ${error}`);
        }
        const tokenPayload = ticket.getPayload();

        if (!tokenPayload) {
            console.log(`No payload in token`);
        }
        return tokenPayload;
    }
}
