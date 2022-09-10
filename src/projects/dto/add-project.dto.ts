import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  onGoing: boolean;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsString()
  involvement: string;

  @IsNotEmpty()
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
