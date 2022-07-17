import {IsNotEmpty, IsString, IsBooleanString} from 'class-validator'

export class AddProjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsBooleanString()
    onGoing: boolean;

    @IsNotEmpty()
    @IsString()
    description: string;

    logo: any;
}