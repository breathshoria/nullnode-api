import {IsNotEmpty, IsString, IsBoolean, IsEmail} from 'class-validator'

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    name: string;
}