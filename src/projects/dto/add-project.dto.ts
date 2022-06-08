import {IsNotEmpty, IsString, IsBoolean } from 'class-validator'

export class AddProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsBoolean()
    onGoing: boolean;

    @IsNotEmpty()
    @IsString()
    description: string;
}