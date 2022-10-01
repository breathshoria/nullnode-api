import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProjectDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsNotEmpty({ message: 'Title should be not empty' })
  @IsString()
  title: string;

  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  onGoing: boolean;

  @IsString()
  description: string;

  @IsString()
  summary: string;

  @IsString()
  involvement: string;

  @IsNotEmpty({ message: 'Project stage should be not empty' })
  @IsString()
  stage: string;

  @IsString()
  guide: string;

  logoUrl: any;

  @IsString()
  website: string;

  @IsString()
  github: string;

  @IsString()
  telegram: string;

  @IsString()
  discord: string;
}
