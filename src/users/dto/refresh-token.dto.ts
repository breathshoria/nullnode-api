import {IsNotEmpty, IsEmail, IsString} from 'class-validator'

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}