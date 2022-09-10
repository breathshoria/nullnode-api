import { IsNotEmpty } from 'class-validator';

class ProjectId {
  id: number;
}

export class AddProjectsDto {
  @IsNotEmpty()
  projectsId: ProjectId[];
}
