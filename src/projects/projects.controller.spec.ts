import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import {AppModule} from "../app.module";
import {ProjectsService} from "./projects.service";
import {PrismaService} from "../prisma.service";

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ProjectsController],
      providers: [ProjectsService, PrismaService]
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
