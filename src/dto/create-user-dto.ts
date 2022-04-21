import { Expose } from "class-transformer";
import { isString } from "util";

export class CreateUserDto{
    @Expose()
    googleId: string;
    
    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    pictureUrl: string;


}