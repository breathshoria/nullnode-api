import {IsNotEmpty, IsArray, IsEmail} from 'class-validator'

class ProjectId {
    id: number;
}

export class AddProjectsDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsArray()
    projectsId: ProjectId[];
}