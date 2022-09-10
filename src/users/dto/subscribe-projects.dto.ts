import { IsNotEmpty } from 'class-validator';

class ProjectId {
  id: number;
}

export class UpdateSubscriptionDto {
  @IsNotEmpty()
  projectId: ProjectId;
}
