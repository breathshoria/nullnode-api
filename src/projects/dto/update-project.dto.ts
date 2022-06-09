import {IsString, IsBoolean, IsNotEmpty} from 'class-validator'

export class UpdateProjectDto {
    @IsNotEmpty()
    id: string

    @IsString()
    title: string;

    @IsString()
    startDate: string;

    @IsBoolean()
    onGoing: boolean;

    @IsString()
    description: string;
}