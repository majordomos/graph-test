import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';

@Module({
    imports:[],
    providers: [GoogleAuthService],
    controllers: [],
    exports: []

})
export class GoogleAuthModule {}
