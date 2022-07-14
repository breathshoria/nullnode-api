import {IsString, IsBoolean, IsNotEmpty} from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    id: number;

    @IsString()
    title: string;

    @IsString()
    startDate: string;

    @IsBoolean()
    onGoing: boolean;

    @IsString()
    description: string;
}